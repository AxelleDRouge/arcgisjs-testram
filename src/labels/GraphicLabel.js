import Point from "esri/geometry/Point";
import Polyline from "esri/geometry/Polyline";
import Graphic from "esri/Graphic";

import { colorservice } from "src/labels/ColorService";

export default class GraphicLabel {
  textAttribute;
  coordStart;
  coordFinish;
  haloColor;
  fontSize;
  textColor;
  police;
  referenceGraphic;

  constructor (labelAttributes, graphic) {
    this.referenceGraphic = graphic;
    this.textAttribute = labelAttributes.getTextAttribute();
    this.coordStart = labelAttributes.getCoordStart();
    this.coordFinish = labelAttributes.getCoordFinish();
    this.fontSize = labelAttributes.getFontSize();
    this.haloColor = labelAttributes.getHaloColor();
    this.textColor = labelAttributes.getTextColor();
    this.police = labelAttributes.getPolice();
  }

  generateGraphicLabel() {

    const labelSymbol = {
      type: "text",
      color:
        colorservice.getHexaColorOf(this.textColor) || "#FFFFFF",
      haloColor:
        colorservice.getHexaColorOf(this.haloColor) || "#FFFFFF",
      haloSize: "3px",
      text: this.textAttribute || " ",
      font: {
        size: this.fontSize || "10px",
        // family: "Arial"
      }
    };
    const point = new Point({
      x: this.coordStart[0],
      y: this.coordStart[1],
      spatialReference: this.referenceGraphic.geometry.spatialReference
    });
    const label = new Graphic({
      symbol: labelSymbol,
      geometry: point,
      attributes: {
        objectid: this.referenceGraphic.attributes.OBJECTID,
        text: this.textAttribute
      }
    });
    return label;
  }

  generateLink() {
    const line = new Polyline({
      hasZ: false,
      hasM: false,
      paths: [[this.coordStart, this.coordFinish]],
      spatialReference: this.referenceGraphic.geometry.spatialReference
    });

    const lineSymbol = {
      type: "simple-line",
      color: "black",
      width: 0.5
    };

    const link = new Graphic({
      geometry: line,
      symbol: lineSymbol,
      layer: this.referenceGraphic.layer,
      attributes: {
        objectid: this.referenceGraphic.attributes.OBJECTID
      }
    });
    return link;
  }
}
