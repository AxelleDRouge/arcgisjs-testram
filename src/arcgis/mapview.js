import MapView from "esri/views/MapView";
import Map from "esri/Map";
import TileLayer from "esri/layers/TileLayer";
import Basemap from "esri/Basemap";
import WebMap from "esri/WebMap";
// carte avec les données magéllium
const createMap = (container) => {

  const map = new Map({
    basemap: "dark-gray",
  });

  const view = new MapView({
    map: map,
    container,
    center: [-117.18, 34.06],
    zoom: 15
  });

  return view;
}
module.exports = createMap;