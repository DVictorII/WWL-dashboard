import moment from "moment";
import {
  activeIcon,
  damagedIcon,
  disconnectedIcon,
  incidentIcon,
  proposedIcon,
  tarpIcon,
} from "./icons";

import L from "leaflet";
import "../MarkerCluster.css";
import "../MarkerCluster.Default.css";
import "leaflet.markercluster";
import { satelliteMap, sentinelMap, statusOptions } from "./map";

import { IncidentDetails } from "../types";

export async function drawPiezometers({
  piezometers,
  map,
  piezoList,
  markers,
  lastReadings,
  page = "none",
  goToLectures,
}: any) {
  // adding circles to the map
  // @ts-ignore
  piezoList.map((piezometer) => {
    let icon;

    switch (piezometer.status) {
      case 1:
        icon = activeIcon;
        break;
      case 2:
        icon = damagedIcon;
        break;
      case 3:
        icon = disconnectedIcon;
        break;
      case 4:
        icon = proposedIcon;
        break;

      case 5:
        icon = tarpIcon;
        break;
    }
    const circle = L.marker([piezometer.lat, piezometer.lon], {
      icon: icon,
    });

    const lastReading = lastReadings.find(
      //@ts-ignore
      (reading) =>
        reading.node === piezometer.datalogger &&
        reading.channel === piezometer.channel
    );

    const popup = L.popup().setLatLng([piezometer.lat, piezometer.lon])
      .setContent(`
      <div class="flex flex-col gap-y-4">
        <div class="font-semibold text-lg ${
          page === "dashboard"
            ? `${piezometer.id} w-max pb-1 border-b-2 border-[#222] border-transparent lg:hover:border-[#222]`
            : ""
        }  " >
          <span>${piezometer.paddock}</span> / <span>${piezometer.id}</span>
        </div>

        <div class="flex items-center gap-x-4">
          <span class="font-semibold text-xs">Section: </span>
          <span>${piezometer.section ? piezometer.section : "None"}</span>
        </div>

        <div class="flex flex-col gap-y-2" >
          <span class="font-semibold text-xs" >Location coordinates: </span>
          <span>${Number(piezometer.lat).toFixed(6)}° / ${Number(
      piezometer.lon
    ).toFixed(6)}°</span>
        </div>

        <div class="flex items-center gap-x-4">
          <span class="font-semibold text-xs" >Depth: </span>
          <span>${
            piezometer.depth
              ? `${Number(piezometer.depth).toFixed(1)} m`
              : "In consideration"
          }</span>
        </div>

        <div class="flex items-center gap-x-4">
          <span class="font-semibold text-xs">Status: </span><span>${
            //@ts-ignore
            statusOptions[piezometer.status]
          }</span>
        </div>

        ${
          lastReading && lastReading.pressure && Number(lastReading.pressure)
            ? `
        
          <div class="flex items-center gap-x-4">
            <span class="font-semibold text-xs">Current PWP: </span><span>${Number(
              lastReading.pressure
            ).toFixed(3)} KPa</span>
          </div>

          <div class="flex items-center gap-x-4">
            <span class="font-semibold text-xs">Last reading at: </span><span>${moment(
              String(lastReading.time)
            ).format("YYYY-MM-DD hh:mm:ss")}</span>
          </div>
          `
            : ""
        }

        ${
          page === "dashboard"
            ? `<div class="${piezometer.id} mt-6">
          <span class="text-sm  text-sky-800 font-semibold pb-1 border-b-2 border-sky-800 lg:border-transparent lg:hover:border-sky-800">Check piezo. lectures &rarr;</span>

        </div>`
            : ""
        }
        
      
      </div>
      
    `);
    //@ts-ignore

    circle.bindPopup(popup, {
      interactive: true,
    });

    popup.on("add", (e) => {
      const title = document.querySelectorAll(`.${piezometer.id}`);
      title?.forEach((t) =>
        t.addEventListener("click", () => {
          if (page === "dashboard")
            goToLectures(piezometer.paddock, piezometer.id);
        })
      );
    });

    markers.addLayer(circle);
    piezometers.push(circle);
  });
  map?.addLayer(markers);
}

export async function drawIncidents({
  piezometers,
  map,
  piezoList,
  markers,
}: {
  piezometers: any[];
  map: any;
  piezoList: IncidentDetails[];
  markers: any;
}) {
  // adding circles to the map
  // @ts-ignore
  piezoList.map((piezometer) => {
    let icon = incidentIcon;

    const circle = L.marker(
      [
        Number(piezometer.incident_latitude),
        Number(piezometer.incident_longitude),
      ],
      {
        icon: icon,
      }
    );
    circle.bindPopup(`
        <div class="flex flex-col gap-y-4">
          <div class="font-semibold">
            <span>${piezometer.incident_title}</span>
          </div>

          <div class="flex items-center gap-x-4">
            <span class="font-semibold text-[10px]">Paddock section: </span>
            <span class="text-xs" >${piezometer.incident_paddock}</span>
          </div>

          <div class="flex flex-col gap-y-2" >
            <span class="font-semibold text-[10px]" >Location coordinates: </span>
            <span class="text-xs" >${piezometer.incident_latitude}° / ${piezometer.incident_longitude}°</span>
          </div>

          <div class="flex items-center gap-x-4">
            <span class="font-semibold text-[10px]" >Elevation: </span>
            <span class="text-xs" >${piezometer.incident_elevation} m</span>
          </div>

          <div class="flex items-center gap-x-4">
            <span class="font-semibold text-[10px]" >Inspection date: </span>
            <span class="text-xs" >${piezometer.incident_date}</span>
          </div>
        </div>
      `);

    markers.addLayer(circle);
    piezometers.push(circle);
  });

  map?.addLayer(markers);
}

export async function drawPaddock({
  map,
  paddockData,
}: {
  map: L.Map | L.LayerGroup<any> | undefined;
  paddockData: any;
}) {
  //   if (paddockComp && map !== undefined) {
  //     map.removeLayer(paddockComp);
  //   }

  const paddockComp = L.geoJSON(paddockData).addTo(
    map as L.Map | L.LayerGroup<any>
  );

  return paddockComp;
}

//@ts-ignore
export async function DrawMap({
  basemap,
  piezometersData,
  current_zoom,
  mapDOM,
}: any) {
  const map = L.map(mapDOM, {
    center: L.latLng(piezometersData[0].lat, piezometersData[0].lon),
    zoom: current_zoom,
    // @ts-ignore: Unreachable code error
    layers: basemap,
    fadeAnimation: true,
    zoomAnimation: true,
  });

  return map;
}

async function DrawIncidentsMap({
  basemap,
  incidentList,
  current_zoom,
  mapDOM,
}: {
  basemap: any;
  incidentList: IncidentDetails[];
  current_zoom: number;
  mapDOM: any;
}) {
  const myMap = L.map(mapDOM, {
    center: L.latLng(
      Number(incidentList[0].incident_latitude),
      Number(incidentList[0].incident_longitude)
    ),
    zoom: current_zoom,
    layers: basemap,
    fadeAnimation: true,
    zoomAnimation: true,
  });

  return myMap;
}

export const DrawPrincipalMap = async ({
  basemap,
  piezometersData,
  current_zoom,
  mapDOM,
  paddock,
}: any) => {
  let flag = undefined;
  if (piezometersData) {
    flag =
      // @ts-ignore
      piezometersData.length > 0
        ? piezometersData.length > 1
          ? piezometersData[1]
          : piezometersData[0]
        : undefined;
  }

  const myMap = L.map(mapDOM, {
    //@ts-ignore
    center:
      flag && paddock !== "All"
        ? L.latLng(flag.lat, flag.lon)
        : L.latLng(-22.450643, 15.031006),
    zoom:
      // @ts-ignore
      paddock !== "All" && piezometersData?.length !== 0 ? 16 : current_zoom,
    // @ts-ignore: Unreachable code error
    layers: basemap,
    fadeAnimation: true,
    zoomAnimation: true,
  });

  return myMap;
};

export const addSections = async ({ sectionsData, map }: any) => {
  const sections = L.geoJSON(sectionsData, {
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
  }).addTo(map);

  return sections;
};

export async function InitializeMap({
  piezometersData,
  basemap,
  current_zoom,
  changeBasemap,
  mapDOM,
  page,
  paddock = "All",
  date = moment(Date.now()).format("YYYY-MM-DD"),
}: any) {
  const satellite = await satelliteMap(date);
  const sentinelHub = await sentinelMap(date);

  // Drawing map and setting base to satellite
  const map =
    page === "dashboard"
      ? await DrawPrincipalMap({
          basemap: basemap === "satellite" ? satellite : sentinelHub,
          piezometersData,
          current_zoom,
          mapDOM,
          paddock,
        })
      : page === "paddock"
      ? await DrawMap({
          basemap: basemap === "satellite" ? satellite : sentinelHub,
          piezometersData,
          current_zoom,
          mapDOM,
        })
      : await DrawIncidentsMap({
          basemap: basemap === "satellite" ? satellite : sentinelHub,
          incidentList: piezometersData,
          current_zoom,
          mapDOM,
        });

  //base maps
  const baseMaps = {
    Satellite: satellite,
    "Moisture Index": sentinelHub,
  };

  // @ts-ignore
  const baselayer = L.control.layers(baseMaps).addTo(map);

  // @ts-ignore
  map.on("baselayerchange", function (event) {
    switch (event.layer) {
      case sentinelHub:
        changeBasemap("sentinel");
        break;
      case satellite:
        changeBasemap("satellite");
        break;
    }
  });

  return map;
}

export const init = async ({
  piezoList,
  piezometers,
  paddockComp,
  map,
  piezometersData,
  sections,
  sectionsData,
  paddockData,
  changeBasemap,
  current_zoom,
  basemap,
  baselayer,
}: any) => {
  //Re - initialize the map
  await InitializeMap({
    piezometersData,
    map,
    basemap,
    current_zoom,
    changeBasemap,
    baselayer,
  });
  await addSections({ sections, sectionsData, map });
  await drawPaddock({
    map,
    paddockData,
  });

  //Draw piezometers using the filtered list
  await drawPiezometers(piezoList);
};
