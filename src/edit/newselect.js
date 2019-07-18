import Graphic from 'esri/Graphic';
import unselectFeature from './unselect';

const newSelect = (obj) => {
    return new Promise(function (resolve, reject) {
    let highlight;
    obj.source.queryFeatures({
      objectIds: [obj.objectId],
      outFields: ["*"],
      returnGeometry: true
    }).then((results) => {
      if (results.features.length > 0) {
       const editFeature = results.features[0];
              
        obj.view.whenLayerView(obj.source)
          .then(function (layerView) {
            highlight = layerView.highlight(editFeature);
          })
       return editFeature
      }})
          .then( (editFeature) => {            
            const handler = obj.view.on("double-click", (event) => {
              let editsParams;
              handler.remove();
              event.stopPropagation();
  
              if (event.mapPoint) {
                const point = event.mapPoint.clone();
                point.z = undefined;
                point.hasZ = false;
                const editFeatureToUpdate = new Graphic({
                  geometry: point,
                  attributes: editFeature.attributes
                });
                console.log(editFeature.attributes)
                editsParams = {
                source : obj.source.title,    
                edits : {
                  updateFeatures: [editFeatureToUpdate]
                }
            };
                unselectFeature(highlight);
                resolve(editsParams)
              }
            });
          })
    });
  }

  module.exports = newSelect