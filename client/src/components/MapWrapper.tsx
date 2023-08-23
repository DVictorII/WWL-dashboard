// @ts-ignore: Unreachable code error
import { fetchPaddockGeometry, fetchSectionsData } from "../utils/map";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { useQuery } from "react-query";
import { useEffect, useState } from "react";

import "../MarkerCluster.css";
import "../MarkerCluster.Default.css";
import "leaflet.markercluster";

import { useMapStore } from "../store/MapStateStore";
import {
  addSections,
  drawPaddock,
  drawPiezometers,
  InitializeMap,
} from "../utils/mapInitFunc";

import { useNavigate } from "react-router-dom";
import { useMonitoringMapStateStore } from "../store/MonitoringMapStateStore";
import { usePiezometerLecturesStateStore } from "../store/PiezometerLecturesStateStore";
import SkeletonMapWrapper from "./Skeletons/MonitoringMap/SkeletonMapWrapper";
import { PiezometerDataI } from "../types";

function MapWrapper() {
  const status = useMonitoringMapStateStore((s) => s.status);
  const paddock = useMonitoringMapStateStore((s) => s.paddock);
  const piezo = useMonitoringMapStateStore((s) => s.piezo);
  const date = useMonitoringMapStateStore((s) => s.date);
  const section = useMonitoringMapStateStore((s) => s.section);
  const changeChartPaddockAndPiezo = usePiezometerLecturesStateStore(
    (state) => state.changePaddockAndPiezo
  );

  const lastReadings = useMonitoringMapStateStore((s) => s.lastReadings);
  const piezometersData = useMonitoringMapStateStore((s) => s.piezometersData);

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

  const { isLoading: paddocksAreLoading, data: paddockData } = useQuery({
    queryKey: [`paddock-${paddock ? paddock : "None"}`],
    queryFn: () => fetchPaddockGeometry({ paddock }),
    refetchOnWindowFocus: false,
  });

  const [piezoDataFiltered, setPiezoDataFiltered] = useState(undefined);

  //@ts-ignore
  const filterPiezometers = (fullPiezoList) => {
    //@ts-ignore
    let filtered = [];

    //@ts-ignore
    if (!fullPiezoList) return filtered;

    if (status === 5) {
      if (paddock === "All") {
        if (section === "All") {
          filtered = fullPiezoList.filter(
            (p: PiezometerDataI) => p.time_threshold_wrong != null
          );
        } else {
          filtered = fullPiezoList.filter(
            (p: PiezometerDataI) =>
              p.section == section && p.time_threshold_wrong != null
          );
        }
      } else {
        if (section === "All") {
          filtered = fullPiezoList.filter(
            (p: PiezometerDataI) =>
              p.time_threshold_wrong != null && p.paddock === paddock
          );
        } else {
          filtered = fullPiezoList.filter(
            (p: PiezometerDataI) =>
              p.section == section &&
              p.time_threshold_wrong != null &&
              p.paddock === paddock
          );
        }
      }
    } else if (status === 0 || status === 6) {
      if (paddock === "All") {
        if (section === "All") {
          filtered = fullPiezoList;
        } else {
          filtered = fullPiezoList.filter(
            (p: PiezometerDataI) => p.section == section
          );
        }
      } else {
        if (piezo === "All") {
          if (section === "All") {
            filtered = fullPiezoList.filter(
              (p: PiezometerDataI) => p.paddock === paddock
            );
          } else {
            filtered = fullPiezoList.filter(
              (p: PiezometerDataI) =>
                p.section == section && p.paddock === paddock
            );
          }
        } else {
          filtered = fullPiezoList.filter(
            (p: PiezometerDataI) => p.paddock === paddock && p.id === piezo
          );
        }
      }
    } else {
      if (paddock === "All") {
        if (section === "All") {
          filtered = fullPiezoList.filter(
            (p: PiezometerDataI) => p.status == status
          );
        } else {
          filtered = fullPiezoList.filter(
            (p: PiezometerDataI) => p.section == section && p.status == status
          );
        }
      } else {
        if (section === "All") {
          filtered = fullPiezoList.filter(
            (p: PiezometerDataI) => p.status == status && p.paddock === paddock
          );
        } else {
          filtered = fullPiezoList.filter(
            (p: PiezometerDataI) =>
              p.section == section &&
              p.status == status &&
              p.paddock === paddock
          );
        }
      }
    }

    return filtered;
  };

  useEffect(() => {
    if (!piezometersData) return;
    //@ts-ignore
    const filtered = filterPiezometers(piezometersData);
    setPiezoDataFiltered(filtered);
  }, [piezometersData]);

  const markers = L.markerClusterGroup({
    maxClusterRadius: 100,
  });

  const navigate = useNavigate();

  //@ts-ignore
  const goToLectures = (paddock, piezo) => {
    // const changedPaddock = paddock.replaceAll("/", "-");
    changeChartPaddockAndPiezo(paddock, piezo);

    navigate("/operations/piezometer-readings");
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
      !paddocksAreLoading &&
      !myMap &&
      piezoDataFiltered
    )
      init(piezoDataFiltered);
  }, []);

  useEffect(() => {
    if (
      !sectionsAreLoading &&
      !paddocksAreLoading &&
      !myMap &&
      piezoDataFiltered
    )
      init(piezoDataFiltered);
  }, [sectionsAreLoading, paddocksAreLoading, piezoDataFiltered]);

  if (sectionsAreLoading || paddocksAreLoading || !piezoDataFiltered)
    return <SkeletonMapWrapper />;

  return (
    <div className=" w-full   grow min-h-[55vh] rounded-[4px] overflow-hidden  relative z-[10]">
      <div id="map"></div>
    </div>
  );
}

export default MapWrapper;
