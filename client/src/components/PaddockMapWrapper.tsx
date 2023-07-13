// @ts-ignore: Unreachable code error
import {
  fetchLastReadings,
  fetchPaddockGeometry,
  fetchPiezometerData,
  fetchSectionsData,
  satelliteMap,
  sentinelMap,
} from "../utils/map";
import "leaflet/dist/leaflet.css";

// @ts-ignore: Unreachable code error
import { boxShadowSlight } from "../utils/shadow";

import L from "leaflet";
import moment from "moment";
import axios from "axios";
import { useQuery } from "react-query";
import { useEffect } from "react";

import "../MarkerCluster.css";
import "../MarkerCluster.Default.css";
import "leaflet.markercluster";
import {
  activeIcon,
  damagedIcon,
  disconnectedIcon,
  proposedIcon,
  tarpIcon,
} from "../utils/icons";

import FadeLoader from "react-spinners/FadeLoader";
import { useMapStore } from "../store/MapStateStore";
import {
  addSections,
  DrawMap,
  drawPaddock,
  drawPiezometers,
  InitializeMap,
} from "../utils/mapInitFunc";
import { usePiezometerLecturesStateStore } from "../store/PiezometerLecturesStateStore";
import SkeletonPaddockMapWrapper from "./Skeletons/PiezometerLectures/SkeletonPaddockMapWrapper";

interface ChartState {
  paddock: string;
  piezo: string;
  date?: string;
}

//@ts-ignore
function PaddockMapWrapper() {
  const current_zoom = 16;
  const basemap = useMapStore((state) => state.basemap);
  const changeBasemap = useMapStore((state) => state.changeBasemap);

  const paddock = usePiezometerLecturesStateStore((s) => s.paddock).replaceAll(
    "/",
    "-"
  );

  const piezo = usePiezometerLecturesStateStore((s) => s.piezo);

  let sentinelHub: L.Layer;
  let satellite: L.Layer;

  let baselayer: L.Control.Layers;

  let sections: L.GeoJSON<any>;

  let myMap: L.Map | L.LayerGroup<any> | undefined;
  // @ts-ignore: Unreachable code error
  let piezometers = [];
  let paddockComp: L.GeoJSON<any>;

  const { isLoading: sectionsAreLoading, data: sectionsData } = useQuery(
    "sections",
    fetchSectionsData,
    {
      refetchOnWindowFocus: false,
    }
  );

  const { isLoading: piezometersAreLoading, data: piezometersData } = useQuery({
    queryKey: [`Onepiezometer_${paddock}_${piezo}`],
    queryFn: () =>
      fetchPiezometerData({
        paddock: paddock,
        piezo: piezo,
      }),
    refetchOnWindowFocus: false,
  });

  const { isLoading: lastReadingsAreLoading, data: lastReadings } = useQuery(
    "last_readings",
    fetchLastReadings,
    {
      refetchOnWindowFocus: false,
    }
  );

  const { isLoading: paddocksAreLoading, data: paddockData } = useQuery({
    queryKey: [`paddock-${paddock ? paddock : "None"}`],
    queryFn: () => fetchPaddockGeometry({ paddock }),
    refetchOnWindowFocus: false,
  });

  const markers = L.markerClusterGroup();

  // @ts-ignore
  const init = async (piezoList) => {
    //Re - initialize the map
    // await clearMap();
    myMap = await InitializeMap({
      piezometersData: piezoList,
      basemap,
      current_zoom,
      changeBasemap,
      mapDOM: "map2",
      page: "paddock",
    });

    sections = await addSections({ sectionsData, map: myMap });
    paddockComp = await drawPaddock({
      map: myMap,
      paddockData,
    });

    //Draw piezometers using the filtered list
    await drawPiezometers({
      //@ts-ignore
      piezometers,
      map: myMap,
      piezoList,
      markers,
      lastReadings,
    });
  };

  useEffect(() => {
    if (
      !sectionsAreLoading &&
      !piezometersAreLoading &&
      !paddocksAreLoading &&
      !lastReadingsAreLoading &&
      !myMap
    ) {
      init(piezometersData);
    }
  }, []);

  useEffect(() => {
    if (
      !sectionsAreLoading &&
      !piezometersAreLoading &&
      !paddocksAreLoading &&
      !lastReadingsAreLoading &&
      !myMap
    ) {
      init(piezometersData);
    }
  }, [
    sectionsAreLoading,
    piezometersAreLoading,
    paddocksAreLoading,
    lastReadingsAreLoading,
  ]);

  if (
    sectionsAreLoading ||
    piezometersAreLoading ||
    paddocksAreLoading ||
    lastReadingsAreLoading
  )
    return <SkeletonPaddockMapWrapper />;

  return (
    <div
      className=" w-full h-[50vh] rounded-lg overflow-hidden shadow-md relative z-[10]"
      style={{ boxShadow: boxShadowSlight }}
    >
      <div id="map2"></div>
    </div>
  );
}

export default PaddockMapWrapper;
