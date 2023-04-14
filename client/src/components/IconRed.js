import L from "leaflet";
import "leaflet/dist/leaflet.css";

const iconRed = L.icon({
  iconUrl: "/alert.svg",
  iconRetinaUrl: "/alert.svg",
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [50, 50],
  className: "leaflet-venue-icon",
});

export default iconRed;
