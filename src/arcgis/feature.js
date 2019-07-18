import FeatureLayer from 'esri/layers/FeatureLayer';
import esriRequest from "esri/request";
import Renderer from 'esri/renderers/Renderer'
import rendererJsonUtils from 'esri/renderers/support/jsonUtils'

const createFeature = (view, renderer, templates, ...urls) => {
    return new Promise(function (resolve, reject) {
        let listSource = []
        let listClient = []
        let objList = {}

        for (let url of urls[0]) {
            const flSource = new FeatureLayer({
                url: url
            });

            let templ = []

            flSource.queryFeatures()
                .then((results) => {
                    const arrayTempl = flSource.types
                    arrayTempl.forEach(element => {
                        templ.push(element.templates[0])
                    });
                    const flClient = new FeatureLayer({
                        source: results.features,
                        fields: flSource.fields,
                        renderer: flSource.renderer,
                        objectIdField: flSource.objectIdField,
                        title: flSource.title,
                        id: flSource.id,
                        layerId: flSource.layerId,
                        templates: templ
                    });

                    view.map.addMany([flClient])
                    listSource.push(flSource);
                    listClient.push(flClient);
                    return flClient
                })
                .then(() => {
                    if (listSource.length === urls[0].length) {
                        objList.client = listClient;
                        objList.source = listSource;
                        resolve(objList)
                    }
                })

                .catch(err => console.log(err))
        }
    })
}

module.exports = createFeature;

