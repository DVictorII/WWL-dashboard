import L from "leaflet";

import "../MarkerCluster.css";
import "../MarkerCluster.Default.css";
import "leaflet.markercluster";
//@ts-ignore
import axios from "./axios";

export const satelliteMap = async () => {
  // Add a tile layer
  let baseUrl =
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}";
  return L.tileLayer(baseUrl, {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a>", //© <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/satellite-v9",
    accessToken:
      "pk.eyJ1Ijoic2hyZWVzdGluYSIsImEiOiJjbDF2ejU2MGIybmlnM2ptdDV1anpmNDg0In0.TxozhPWkzWDabi7yumg5Ww",
  });
};

//@ts-ignore
export const sentinelMap = async (date) => {
  let baseUrl =
    "https://services.sentinel-hub.com/ogc/wms/b67ceddd-6972-4d0d-a865-4332feaf4390";
  return L.tileLayer.wms(baseUrl, {
    tileSize: 512,
    attribution:
      '&copy; <a href="http://www.sentinel-hub.com/" target="_blank">Sentinel Hub</a>',
    // @ts-ignore: Unreachable code error
    urlProcessingApi:
      "https://services.sentinel-hub.com/ogc/wms/1d4de4a3-2f50-493c-abd8-861dec3ae6b2",
    maxcc: 20,
    minZoom: 6,
    maxZoom: 16,
    preset: "MOISTURE-INDEX",
    layers: "MOISTURE-INDEX",
    time: date,
  });
};

export const fetchPiezometersData = async () => {
  const result = await axios.get(`/piezometers-data`);

  return result.data.piezos;
};

export const fetchSectionsData = async () => {
  try{
    const result = await axios.get(`/get_geojson_sections-sections_bp`);
    console.log("DATASections", result)
  
    return result.data.data[0].features;

  }catch(err){
    console.log(err)
  }
};

export const fetchLastReadings = async () => {
  const result = await axios.get(`/last-readings`);

  return result.data.readings;
};

export const fetchPiezometerData = async (obj: {
  paddock: string;
  piezo: string;
}) => {
  try{
    const result = await axios.get(
      `/piezometers-data/${obj.paddock}/${obj.piezo}`
    );
  
    return result.data.piezos;

  }catch{
    return undefined
  }
};

export const fetchPaddockGeometry = async (obj: { paddock: string }) => {
  let paddockName = obj.paddock;
  paddockName = paddockName.replace("/", "");
  paddockName = paddockName.replace("-", "");

  if (obj.paddock !== "All") {
    const result = await axios.get(
      `/get_geojson_paddocks-${paddockName}`
    );

    console.log("PADDOCKS", result)

    return result.data.data[0].features;
  }

  return undefined;
};

export const statusOptions = {
  1: "Active",
  2: "Damaged",
  3: "Disconnected",
  4: "Proposed",
  5: "TARP",
};
