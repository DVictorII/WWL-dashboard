//@ts-ignore
import axios from "../../utils/axios";
import React, { useEffect } from "react";
import { useQuery } from "react-query";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

import "../../MarkerCluster.css";
import "../../MarkerCluster.Default.css";
import "leaflet.markercluster";


import FadeLoader from "react-spinners/FadeLoader";
import {
  addSections,
  drawIncidents,
  DrawMap,
  InitializeMap,
} from "../../utils/mapInitFunc";
import { useMapStore } from "../../store/MapStateStore";

//@ts-ignore
function IncidentMapSingle({ incident }) {
  const current_zoom = 15;
  const basemap = useMapStore((state) => state.basemap);
  const changeBasemap = useMapStore((state) => state.changeBasemap);

  let baselayer: L.Control.Layers;

  let sections: L.GeoJSON<any>;

  let myMap: L.Map | L.LayerGroup<any> | undefined;
  // @ts-ignore: Unreachable code error
  let piezometers = [];

  const fetchSectionsData = async () => {
    const result = await axios.get("/get_geojson_sections-sections_bp");

    return result.data[0].features;
  };

  const { isLoading: sectionsAreLoading, data: sectionsData } = useQuery(
    "sections",
    fetchSectionsData,
    {
      refetchOnWindowFocus: false,
    }
  );

  const markers = L.markerClusterGroup();

  // @ts-ignore: Unreachable code error

  // @ts-ignore
  const init = async (piezoList) => {
    //Re - initialize the map
    myMap = await InitializeMap({
      piezometersData: piezoList,
      basemap,
      current_zoom,
      changeBasemap,
      mapDOM: "map3",
      page: "incidents",
    });

    sections = await addSections({ sectionsData, map: myMap });

    //Draw piezometers using the filtered list
    //@ts-ignore
    await drawIncidents({ piezometers, map: myMap, piezoList, markers });
  };

  useEffect(() => {
    if (!sectionsAreLoading) init([incident]);
  }, []);

  useEffect(() => {
    if (!sectionsAreLoading) init([incident]);
  }, [sectionsAreLoading]);

  if (sectionsAreLoading)
    return (
      <div className="w-full   h-[50vh]  rounded-lg overflow-hidden shadow-sm relative z-[10] flex justify-center items-center">
        <FadeLoader color="#BD9C45" loading={sectionsAreLoading} radius={50} />
      </div>
    );

  return (
    <div
      className=" w-full   h-[50vh]  rounded-lg overflow-hidden shadow-sm relative z-[10]"
    >
      <div id="map3"></div>
    </div>
  );
}

export default IncidentMapSingle;
