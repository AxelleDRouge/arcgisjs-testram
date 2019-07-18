import esriConfig from "esri/config";
import URLs from './configUrls.json';
import * as urlUtils from "esri/core/urlUtils";
let urls = new Array();
urls = URLs;

const DEFAULT_WORKER_URL = "https://js.arcgis.com/4.11/";
const DEFAULT_LOADER_URL = `${DEFAULT_WORKER_URL}dojo/dojo-lite.js`;

esriConfig.workers.loaderUrl = DEFAULT_LOADER_URL;
// esriConfig.request.proxyUrl = "http://localhost:8080/Java/proxy.jsp";
esriConfig.workers.loaderConfig = {
  baseUrl: `${DEFAULT_WORKER_URL}dojo`,
  packages: [
    { name: "esri", location: DEFAULT_WORKER_URL + "esri" },
    { name: "dojo", location: DEFAULT_WORKER_URL + "dojo" },
    { name: "dojox", location: DEFAULT_WORKER_URL + "dojox" },
    { name: "dijit", location: DEFAULT_WORKER_URL + "dijit" },
    { name: "dstore", location: DEFAULT_WORKER_URL + "dstore" },
    { name: "moment", location: DEFAULT_WORKER_URL + "moment" },
    { name: "@dojo", location: DEFAULT_WORKER_URL + "@dojo" },
    {
      name: "cldrjs",
      location: DEFAULT_WORKER_URL + "cldrjs",
      main: "dist/cldr"
    },
    {
      name: "globalize",
      location: DEFAULT_WORKER_URL + "globalize",
      main: "dist/globalize"
    },
    {
      name: "maquette",
      location: DEFAULT_WORKER_URL + "maquette",
      main: "dist/maquette.umd"
    },
    {
      name: "maquette-css-transitions",
      location: DEFAULT_WORKER_URL + "maquette-css-transitions",
      main: "dist/maquette-css-transitions.umd"
    },
    {
      name: "maquette-jsx",
      location: DEFAULT_WORKER_URL + "maquette-jsx",
      main: "dist/maquette-jsx.umd"
    },
    { name: "tslib", location: DEFAULT_WORKER_URL + "tslib", main: "tslib" }
  ]
};

// let proxyURL = "https://pp-rpa-new.magellium.com/tracking_proxy/proxify";

// urlUtils.addProxyRule({
//   proxyUrl: proxyURL,
//   urlPrefix: `https://pp-rpa-new.magellium.com/arcgis/rest/services/METIER/PP_COMPA_V2/FeatureServer/0/applyEdits`
// });

// urlUtils.addProxyRule({
//   proxyUrl: proxyURL,
//   urlPrefix: `https://pp-rpa-new.magellium.com/arcgis/rest/services/METIER/PP_COMPA_V2/FeatureServer/1/applyEdits`
// });

// urlUtils.addProxyRule({
//   proxyUrl: proxyURL,
//   urlPrefix: `https://pp-rpa-new.magellium.com/arcgis/rest/services/METIER/PP_COMPA_V2/FeatureServer/2/applyEdits`
// });

// urlUtils.addProxyRule({
//   proxyUrl: proxyURL,
//   urlPrefix: `https://pp-rpa-new.magellium.com/arcgis/rest/services/METIER/PP_COMPA_V2/FeatureServer/3/applyEdits`
// });
