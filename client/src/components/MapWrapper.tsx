// @ts-ignore: Unreachable code error
import {
  fetchLastReadings,
  fetchPaddockGeometry,
  fetchPiezometersData,
  fetchSectionsData,
  satelliteMap,
  sentinelMap,
} from "../utils/map";

// @ts-ignore: Unreachable code error
import { boxShadowSlight } from "../utils/shadow";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import moment from "moment";
import axios from "axios";
import { useQuery } from "react-query";
import { useEffect, useMemo, useState } from "react";

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
  drawPaddock,
  drawPiezometers,
  InitializeMap,
} from "../utils/mapInitFunc";
import { useChartStore } from "../store/ChartStateStore";
import { useNavigate } from "react-router-dom";
import { useMonitoringMapStateStore } from "../store/MonitoringMapStateStore";

function MapWrapper() {
  const status = useMonitoringMapStateStore((s) => s.status);
  const paddock = useMonitoringMapStateStore((s) => s.paddock);
  const piezo = useMonitoringMapStateStore((s) => s.piezo);
  const date = useMonitoringMapStateStore((s) => s.date);

  const latlng = L.latLng(-22.450643, 15.031006);
  const current_zoom = 14;
  const basemap = useMapStore((state) => state.basemap);
  const changeBasemap = useMapStore((state) => state.changeBasemap);
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

  const { isLoading: piezometersAreLoading, data: piezometersData } = useQuery(
    "piezometers",
    fetchPiezometersData,
    {
      refetchOnWindowFocus: false,
    }
  );

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

  const [piezoDataFiltered, setPiezoDataFiltered] = useState(undefined);

  //@ts-ignore
  const filterPiezometers = (fullPiezoList) => {
    let filtered = [];

    if (status === 0) {
      if (paddock === "All") {
        filtered = fullPiezoList;
      } else {
        if (piezo === "All") {
          //@ts-ignore
          filtered = fullPiezoList.filter((p) => p.paddock === paddock);
        } else {
          filtered = fullPiezoList.filter(
            //@ts-ignore
            (p) => p.paddock === paddock && p.id === piezo
          );
        }
      }
    } else {
      if (paddock === "All") {
        //@ts-ignore
        filtered = fullPiezoList.filter((p) => p.status == status);
      } else {
        filtered = fullPiezoList.filter(
          //@ts-ignore
          (p) => p.status == status && p.paddock === paddock
        );
      }
    }

    return filtered;
  };

  useEffect(() => {
    if (piezometersData) {
      //@ts-ignore
      const filtered = filterPiezometers(piezometersData);
      setPiezoDataFiltered(filtered);
    }
  }, [piezometersAreLoading]);

  const markers = L.markerClusterGroup();

  const changeChartPiezo = useChartStore((s) => s.changePiezo);
  const changeChartPaddock = useChartStore((s) => s.changePaddock);

  const navigate = useNavigate();

  //@ts-ignore
  const goToLectures = (paddock, piezo) => {
    changeChartPaddock(paddock);
    changeChartPiezo(piezo);

    navigate("/paddock-lectures");
  };

  // @ts-ignore
  const init = async (piezoList) => {
    //Re - initialize the map

    myMap = await InitializeMap({
      piezometersData: piezoList,
      basemap,
      current_zoom,
      changeBasemap,
      mapDOM: "map",
      page: "dashboard",
      paddock,
      date,
    });

    sections = await addSections({ sectionsData, map: myMap });

    if (paddock !== "All")
      await drawPaddock({
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
      page: "dashboard",
      goToLectures,
    });
  };

  useEffect(() => {
    if (
      !sectionsAreLoading &&
      !piezometersAreLoading &&
      !paddocksAreLoading &&
      !lastReadingsAreLoading &&
      !myMap &&
      piezoDataFiltered
    )
      init(piezoDataFiltered);
  }, []);

  useEffect(() => {
    if (
      !sectionsAreLoading &&
      !piezometersAreLoading &&
      !paddocksAreLoading &&
      !lastReadingsAreLoading &&
      !myMap &&
      piezoDataFiltered
    )
      init(piezoDataFiltered);
  }, [
    sectionsAreLoading,
    piezometersAreLoading,
    paddocksAreLoading,
    lastReadingsAreLoading,
    piezoDataFiltered,
  ]);

  if (
    sectionsAreLoading ||
    piezometersAreLoading ||
    paddocksAreLoading ||
    lastReadingsAreLoading ||
    !piezoDataFiltered
  )
    return (
      <div className="w-full   h-[60vh]  rounded-[14px] overflow-hidden shadow-md relative z-[10] flex justify-center items-center">
        <FadeLoader
          color="#BD9C45"
          loading={
            sectionsAreLoading ||
            piezometersAreLoading ||
            paddocksAreLoading ||
            lastReadingsAreLoading ||
            !piezoDataFiltered
          }
          radius={50}
        />
      </div>
    );

  return (
    <div
      className=" w-full   h-[50vh]  rounded-[14px] overflow-hidden shadow-md relative z-[10]"
      style={{ boxShadow: boxShadowSlight }}
    >
      <div id="map"></div>
    </div>
  );
}

export default MapWrapper;
