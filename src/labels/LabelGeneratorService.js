//import Query from 'esri/tasks/support/Query';

import GraphicLabel from 'src/labels/GraphicLabel';
import { LabelAttributes } from 'src/labels/LabelAttributes';

import GraphicsLayer from 'esri/layers/GraphicsLayer';

class LabelGeneratorService {
  constructor () { }

  createGraphicsLayer(layer, graphicList) {
    const graphicsList = graphicList
      .map(graphic => {
        return this.createGraphicLabelOf(layer, graphic);
      })
    const lineList = graphicsList.map(obj => obj.link);
    const labelList = graphicsList.map(obj => obj.label);
    return new GraphicsLayer({
      graphics: lineList.concat(labelList),
      title: 'ETIQUETTES ' + layer.title,
    });
  }

  createGraphicLabelOf(layer, graphic) {
    //const textAttribute = this.getText(graphic, layer);
    const textAttribute = "test";
    const labelAttributes = this.initAttributesForLabelInitial(textAttribute, graphic, layer);
    return this.addGraphicToTheView(graphic, labelAttributes);
  }

  deleteGraphicLabel(layer, graphicId) {
    layer.graphicLabelLayer.removeMany(layer.getGraphicLabelById(graphicId));
  }

  deleteManyGraphicLabel(layer, graphicIds) {
    graphicIds.forEach(gr => this.deleteGraphicLabel(layer, gr));
  }

  createManyGraphicLabel(layer, graphics) {
    graphics.forEach(g => this.addGraphicLabelToLayer(layer, g));
  }

  addGraphicLabelToLayer(layer, graphic) {
    let graphicLabel = this.createGraphicLabelOf(layer, graphic);
    if (graphicLabel) {
      layer.graphicLabelLayer.addMany(Object.values(graphicLabel));
    }
  }

  addGraphicToTheView(graphic, labelAttributes) {
    const graphicLabel = new GraphicLabel(labelAttributes, graphic);
    const label = graphicLabel.generateGraphicLabel();
    const link = graphicLabel.generateLink();
    return { link, label };
  }

  initAttributesForLabelInitial(
    textToShow,
    graphic,
    layer
  ) {
    // si l'étiquette est générée par une feature à la création ou via WS

    const {
      coordXLineStart,
      coordYLineStart,
      coordXLineFinish,
      coordYLineFinish,
    } = this.getLabelGeometryCoords(graphic, layer);
    const { haloColor, fontSize, textColor, police } = this.getTextProperties(graphic, layer);
    return new LabelAttributes(
      textToShow,
      coordXLineStart,
      coordYLineStart,
      coordXLineFinish,
      coordYLineFinish,
      haloColor,
      fontSize,
      textColor,
      police
    );
  }

  getTextProperties(graphic, layer) {
    // this.queryAttributsOfGraphicIfMissing(
    //   graphic,
    //   ['et1_couleur_txt', 'et1_couleur_fond', 'et1_taille_txt', 'et1_police_txt'],
    //   layer
    // );
    // const textColor = graphic.attributes.et1_couleur_txt;
    // const haloColor = graphic.attributes.et1_couleur_fond;
    // const fontSize = graphic.attributes.et1_taille_txt;
    // const police = graphic.attributes.et1_police_txt;
    const textColor = 'black';
    const haloColor = 'white';
    const fontSize = 12;
    const police = 'Arial';
    return { haloColor, fontSize, textColor, police };
  }

  getLabelGeometryCoords(graphic, layer) {
    //this.queryAttributsOfGraphicIfMissing(graphic, ['et1_xoffset', 'et1_yoffset'], layer);
    const coordXLineStart = graphic.geometry.get('x');
    const coordYLineStart = graphic.geometry.get('y');
    const coordXLineFinish = graphic.geometry.get('x');
    const coordYLineFinish = graphic.geometry.get('y');
    return { coordXLineStart, coordYLineStart, coordXLineFinish, coordYLineFinish };
  }

  // getText(graphic) {
  //   return graphic.attributes["IncidentDescription"];
  // }

  queryAttributsOfGraphicIfMissing(
    graphic,
    attribut,
    layer
  ) {
    if (attribut.some(att => graphic.getAttribute(att) === null)) {
      // const query = new Query();
      // query.objectIds = [graphic.getAttribute('objectid')];
      // query.outFields = attribut;
      // layer.sourceLayer
      //   .queryFeatures(query)
      //   .then(results =>
      //     attribut.forEach(
      //       attribut => (graphic.attributes[attribut] = results.features[0].attributes[attribut])
      //     )
      //   );
    }
  }
}

export const labelGeneratorService = new LabelGeneratorService();
