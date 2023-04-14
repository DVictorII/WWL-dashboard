import React, { useEffect } from "react";

//@ts-ignore
import { boxShadowSlight } from "../utils/shadow";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../MarkerCluster.css";
import "../MarkerCluster.Default.css";
import "leaflet.markercluster";

//@ts-ignore
import { satelliteMap, sentinelMap } from "../utils/map";
//@ts-ignore
import axios from "../utils/axios";
import { useQuery } from "react-query";
import { photoIcon, videoIcon } from "../utils/icons";
import moment from "moment";

interface Media {
  id: number;
  latitude: number;
  longitude: number;
  type: string;
}

interface VisitMapProps {
  media: Media[];
}

function VisitMap({ media }: VisitMapProps) {
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
    piezoList.map((piezometer, i) => {
      let icon = piezometer.type === "photo" ? photoIcon : videoIcon;

      const circle = L.marker([piezometer.latitude, piezometer.longitude], {
        icon: icon,
      });

      circle.bindPopup(`
        <div class="flex flex-col gap-y-4">
          <div class="font-semibold text-lg">
            <span>${
              piezometer.type === "photo" ? `Photo ${i + 1}` : `Video 1`
            }</span>
          </div>

          <div class="flex flex-col gap-y-2" >
            <span class="font-semibold text-xs" >Location coordinates: </span>
            <span>${piezometer.latitude}° / ${piezometer.longitude}°</span>
          </div>

        

          <div class="flex items-center gap-x-4">
            <a class="pb-1 border-b-2 border-[#0078A8] text-[#831B1B]  cursor-pointer" href="/#/player/${
              piezometer.id
            }" target="_blank">Watch media &rarr;</a>
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
    myMap = L.map("map5", {
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
    if (sectionsData) init(media);
  }, []);

  useEffect(() => {
    if (sectionsData) init(media);
  }, [sectionsData]);

  return (
    <div
      className=" w-full   h-[60vh]  rounded-[14px] overflow-hidden shadow-md relative z-[10]"
      style={{ boxShadow: boxShadowSlight }}
    >
      <div id="map5"></div>
    </div>
  );
}

export default VisitMap;
