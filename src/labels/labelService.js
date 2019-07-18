import { labelGeneratorService } from 'src/labels/LabelGeneratorService';

class LabelService {
  generateLabelsForRequiredLayers(featureLayerList, view) {
    featureLayerList
      .forEach(layer => {
        this.generateLabelsForEachFeatures(layer, view);
      });
  }

  generateLabelsForEachFeatures(layer, view) {
    layer.queryFeatures().then(result => {
      const graphicsLayer = labelGeneratorService.createGraphicsLayer(layer, result.features);
      view.map.add(graphicsLayer);
    });
  }
}

export const labelService = new LabelService();
