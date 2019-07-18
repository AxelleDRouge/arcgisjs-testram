import "./config";
import "./css/main.scss";

import createMap from './arcgis/mapview';
import createFeature from './arcgis/feature';
import editExpand from './arcgis/expand';
import featureTemplates from './arcgis/featuretemplate';
import configUrls from './configUrls.json';
import renderer from './renderer/renderer';
import templates from './template/template';
import moveFeature from './edit/move';
import wsBroadcast from './websocket/websocket';
import { labelService } from './labels/labelService';

let expand, listSource
const ws = new WebSocket("wss:http://localhost:8083")
const view = createMap("app");
const editexpand = editExpand(view, 'editArea', 'top-right')

ws.onopen = (event) => {
  console.log("connection");
}

view.when(() => {
  createFeature(view, renderer, templates, configUrls.urls)
    .then((obj) => {
      listSource = obj.source
      return
    })
    .then(() => {
      featureTemplates("addTemplatesDiv", view.map.layers, view, listSource, ws);
      labelService.generateLabelsForRequiredLayers(view.map.layers, view);
    })
    .then(() => {
      const boutton = document.getElementById('updateButton')
      boutton.onclick = () => moveFeature(view, view.map.layers, listSource, ws)
    })
    .catch((err) => console.log(err))
})

ws.onmessage = (event) => {
  console.log(event);
  wsBroadcast(event, view.map.layers);
}
