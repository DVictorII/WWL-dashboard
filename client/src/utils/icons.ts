import L from "leaflet";
import "leaflet/dist/leaflet.css";

import "../MarkerCluster.css";
import "../MarkerCluster.Default.css";
import "leaflet.markercluster";

export const activeIcon = L.icon({
  iconUrl: "/static/img/icons/i-1.svg",
  iconSize: [30, 30],
  iconAnchor: [0, 0],
  popupAnchor: [15, 0],
});

export const damagedIcon = L.icon({
  iconUrl: "/static/img/icons/i-2.svg",
  iconSize: [30, 30],
  iconAnchor: [0, 0],
  popupAnchor: [15, 0],
});

export const disconnectedIcon = L.icon({
  iconUrl: "/static/img/icons/i-3.svg",
  iconSize: [30, 30],
  iconAnchor: [0, 0],
  popupAnchor: [15, 0],
});

export const proposedIcon = L.icon({
  iconUrl: "/static/img/icons/i-4.svg",
  iconSize: [30, 30],
  iconAnchor: [0, 0],
  popupAnchor: [15, 0],
});

export const tarpIcon = L.icon({
  iconUrl: "/static/img/icons/i-5.svg",
  iconSize: [30, 30],
  iconAnchor: [0, 0],
  popupAnchor: [15, 0],
});

export const incidentIcon = L.icon({
  iconUrl: "/static/img/icons/i-6.svg",
  iconSize: [30, 30],
  iconAnchor: [0, 0],
  popupAnchor: [15, 0],
});

export const photoIcon = L.icon({
  iconUrl: "/static/img/icons/i-photo.svg",
  iconSize: [30, 30],
  iconAnchor: [0, 0],
  popupAnchor: [15, 0],
});

export const videoIcon = L.icon({
  iconUrl: "/static/img/icons/i-video.svg",
  iconSize: [30, 30],
  iconAnchor: [0, 0],
  popupAnchor: [15, 0],
});
