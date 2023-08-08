import React, { useEffect } from "react";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../../MarkerCluster.css";
import "../../MarkerCluster.Default.css";
import "leaflet.markercluster";

//@ts-ignore
import { satelliteMap, sentinelMap } from "../../utils/map";
//@ts-ignore
import axios from "../../utils/axios";
import { useQuery } from "react-query";
import { photoIcon, videoIcon } from "../../utils/icons";
import moment from "moment";
import { useBiannualVisitStateStore } from "../../store/BiannualVisitStateStore";

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

  const updateMediaID = useBiannualVisitStateStore(
    (state) => state.updateMediaID
  );

  //@ts-ignore
  const displayMedia = (id) => {
    updateMediaID(id);
  };

  const fetchSectionsData = async () => {
    try {
      const result = await axios.get("/get_geojson_sections-sections_bp");

      if (!result.data[0].features) return;

      return result.data[0].features;
    } catch (err) {
      console.log(err);
    }
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
      console.log("PIEZOMETER", piezometer);
      let icon = piezometer.type === "photo" ? photoIcon : videoIcon;

      const circle = L.marker([piezometer.latitude, piezometer.longitude], {
        icon: icon,
      });

      const popup = L.popup().setLatLng([
        piezometer.latitude,
        piezometer.longitude,
      ]).setContent(`
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

        

          <div class=" media-${piezometer.id} flex items-center gap-x-4">
            <div class="pb-1 border-b-2 border-[#0078A8] text-[#831B1B]  cursor-pointer" target="_blank">Watch media &rarr;</div>
          </div>
        
        </div>
      `);

      circle.bindPopup(popup, {
        interactive: true,
      });

      popup.on("add", (e) => {
        const title = document.querySelectorAll(`.media-${piezometer.id}`);
        title?.forEach((t) =>
          t.addEventListener("click", () => {
            displayMedia(piezometer.id);
            console.log(piezometer.id);
          })
        );
      });

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
    satellite = await satelliteMap(today);
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
    await InitializeMap();

    await addSections();

    //Draw piezometers using the filtered list
    await drawPiezometers(piezoList);
  };

  useEffect(() => {
    if (!sectionsAreLoading && !myMap) init(media);
  }, []);

  useEffect(() => {
    if (!sectionsAreLoading && !myMap) init(media);
  }, [sectionsAreLoading]);

  return (
    <div className="  w-full   h-[50vh]  rounded-xl overflow-hidden shadow-md relative z-[10]">
      <div id="map5"></div>
    </div>
  );
}

export default VisitMap;
