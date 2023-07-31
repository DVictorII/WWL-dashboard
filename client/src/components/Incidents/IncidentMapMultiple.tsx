import React, { useEffect } from "react";

//@ts-ignore
import { satelliteMap, sentinelMap } from "../../utils/map";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
//@ts-ignore
import axios from "../../utils/axios";
import { useQuery } from "react-query";
import moment from "moment";

//@ts-ignore
import { boxShadowSlight } from "../../utils/shadow";

import "../../MarkerCluster.css";
import "../../MarkerCluster.Default.css";
import "leaflet.markercluster";
import { incidentIcon } from "../../utils/icons";
import FadeLoader from "react-spinners/FadeLoader";
import SkeletonIncidentMapMultiple from "../Skeletons/Incidents/SkeletonIncidentMapMultiple";

function IncidentMapMultiple() {
  const latlng = L.latLng(-22.450643, 15.031006);
  const current_zoom = 14;
  let basemap = "satellite";
  let sentinelHub: L.Layer;
  let satellite: L.Layer;

  let baselayer: L.Control.Layers;

  let sections: L.GeoJSON<any>;

  let myMap: L.Map | L.LayerGroup<any> | undefined;
  // @ts-ignore: Unreachable code error
  let piezometers = [];

  const fetchSectionsData = async () => {
    const result = await axios.get("/get_geojson_sections-sections_bp");
    // console.log(result.data.data[0].features)
    return result.data.data[0].features;
  };

  const fetchIncidents = async () => {
    const result = await axios.get("/incident-reports");
    return result.data.incidents;
  };

  const { isLoading: sectionsAreLoading, data: sectionsData } = useQuery(
    "sections",
    fetchSectionsData,
    {
      refetchOnWindowFocus: false,
    }
  );

  const { isLoading: incidentsAreLoading, data: incidents } = useQuery(
    "incidents",
    fetchIncidents,
    {
      refetchOnWindowFocus: false,
    }
  );

  const markers = L.markerClusterGroup();

  // @ts-ignore: Unreachable code error
  async function drawPiezometers(piezoList) {
    //clear_map();
    if (piezometers.length !== 0 && myMap !== undefined) {
      for (let i = 0; i < piezometers.length; i++) {
        // @ts-ignore: Unreachable code error
        myMap.removeLayer(piezometers[i]);
      }
    }

    // adding circles to the map
    // @ts-ignore
    piezoList.map((incident) => {
      let icon = incidentIcon;

      const circle = L.marker(
        [incident.incident_latitude, incident.incident_longitude],
        {
          icon: icon,
        }
      );

      circle.bindPopup(`
        <div class="flex flex-col gap-y-4">
          <div class="font-semibold text-lg">
            <span>${incident.incident_title}</span>
          </div>

          <div class="flex items-center gap-x-4">
            <span class="font-semibold text-xs">Paddock section: </span>
            <span>${incident.incident_paddock}</span>
          </div>

          <div class="flex flex-col gap-y-2" >
            <span class="font-semibold text-xs" >Location coordinates: </span>
            <span>${incident.incident_latitude}° / ${incident.incident_longitude}°</span>
          </div>

          <div class="flex items-center gap-x-4">
            <span class="font-semibold text-xs" >Elevation: </span>
            <span>${incident.incident_elevation} m</span>
          </div>

          <div class="flex items-center gap-x-4">
            <span class="font-semibold text-xs" >Inspection date: </span>
            <span>${incident.incident_date}</span>
          </div>

          <div class="flex items-center gap-x-4">
            <a class="pb-1 border-b-2 border-[#0078A8] text-[#831B1B] text cursor-pointer" href="/operations/reports/incidents/${incident.incident_id}" target="_blank">See incident details &rarr;</a>
          </div>
        
        </div>
      `);

      markers.addLayer(circle);
      piezometers.push(circle);
    });

    myMap?.addLayer(markers);
  }

  // @ts-ignore
  async function DrawMap(baseMap) {
    myMap = L.map("map4", {
      center: latlng,
      zoom: current_zoom,
      // @ts-ignore: Unreachable code error
      layers: baseMap,
      fadeAnimation: true,
      zoomAnimation: true,
    });
  }

  //@ts-ignore
  async function InitializeMap() {
    myMap = undefined;
    const today = moment(Date.now()).format("YYYY-MM-DD");
    satellite = await satelliteMap();
    sentinelHub = await sentinelMap(today);

    // Drawing map and setting base to satellite
    await DrawMap(satellite);
    //base maps
    const baseMaps = {
      Satellite: satellite,
      "Moisture Index": sentinelHub,
    };

    // @ts-ignore
    baselayer = L.control.layers(baseMaps).addTo(myMap);

    await addSections();

    // @ts-ignore
    myMap.on("baselayerchange", function (event) {
      switch (event.layer) {
        case sentinelHub:
          basemap = "sentinel";
          break;
        case satellite:
          basemap = "satellite";
          break;
      }
    });
  }

  const addSections = async () => {
    sections = L.geoJSON(sectionsData, {
      style: function (feature) {
        return {
          color: feature?.properties["stroke"],
          opacity: parseFloat(feature?.properties["stroke-opacity"]),
          weight: 3,
          dashArray: "10 5",
          dashOffset: "10",
        };
      },
      onEachFeature: function (feature, layer) {
        if (feature.properties && feature.properties.name) {
          const name = feature.properties.name;
          layer.bindPopup(
            `<div><span style="font-size:14px; font-weight:600;">${name}</span></div>`
          );
        }
      },
      // @ts-ignore: Unreachable code error
    }).addTo(myMap);
  };

  const clearMap = async () => {
    for (let i = 0; i < piezometers.length; i++) {
      // @ts-ignore: Unreachable code error
      myMap.removeLayer(piezometers[i]);
    }

    // @ts-ignore

    myMap?.removeLayer(sections);
    // @ts-ignore
    myMap?.removeLayer(baselayer);
  };

  // @ts-ignore
  const init = async (piezoList) => {
    //Re - initialize the map
    await clearMap();
    await InitializeMap();

    //Draw piezometers using the filtered list
    await drawPiezometers(piezoList);
  };

  useEffect(() => {
    if (sectionsData && incidents) init(incidents);
  }, []);

  useEffect(() => {
    if (sectionsData && incidents) init(incidents);
  }, [sectionsData, incidents]);

  if (sectionsAreLoading || incidentsAreLoading)
    return <SkeletonIncidentMapMultiple />;

  return (
    <div className="w-full   h-96 md:h-[26rem] lg:h-[28rem]  rounded-md overflow-hidden shadow-md relative z-[10]">
      <div id="map4"></div>
    </div>
  );
}

export default IncidentMapMultiple;
