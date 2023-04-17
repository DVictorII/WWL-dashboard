import L from "leaflet";
import "leaflet/dist/leaflet.css";

import "../MarkerCluster.css";
import "../MarkerCluster.Default.css";
import "leaflet.markercluster";

export const activeIcon = L.icon({
  iconUrl: "/media/icons/i-1.svg",
  iconSize: [30, 30],
  iconAnchor: [0, 0],
  popupAnchor: [15, 0],
});

export const damagedIcon = L.icon({
  iconUrl: "/media/icons/i-2.svg",
  iconSize: [30, 30],
  iconAnchor: [0, 0],
  popupAnchor: [15, 0],
});

export const disconnectedIcon = L.icon({
  iconUrl: "/media/icons/i-3.svg",
  iconSize: [30, 30],
  iconAnchor: [0, 0],
  popupAnchor: [15, 0],
});

export const proposedIcon = L.icon({
  iconUrl: "/media/icons/i-4.svg",
  iconSize: [30, 30],
  iconAnchor: [0, 0],
  popupAnchor: [15, 0],
});

export const tarpIcon = L.icon({
  iconUrl: "/media/icons/i-5.svg",
  iconSize: [30, 30],
  iconAnchor: [0, 0],
  popupAnchor: [15, 0],
});

export const incidentIcon = L.icon({
  iconUrl: "/media/icons/i-6.svg",
  iconSize: [30, 30],
  iconAnchor: [0, 0],
  popupAnchor: [15, 0],
});

export const photoIcon = L.icon({
  iconUrl: "/media/icons/i-photo.svg",
  iconSize: [30, 30],
  iconAnchor: [0, 0],
  popupAnchor: [15, 0],
});

export const videoIcon = L.icon({
  iconUrl: "/media/icons/i-video.svg",
  iconSize: [30, 30],
  iconAnchor: [0, 0],
  popupAnchor: [15, 0],
});
