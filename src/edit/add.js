import Graphic from 'esri/Graphic';

const addFromTemplate = (event, view) => {
    return new Promise(function (resolve, reject) {
        const attributes = event.template.prototype.attributes;
        attributes.et1_connecteur = 0;
        attributes.et1_police_txt = "Arial";
        attributes.et1_taille_txt = 8;
        attributes.et1_xoffset = 2;
        attributes.et1_yoffset = 3;
        attributes.et2_connecteur = attributes.et1_connecteur;
        attributes.et2_police_txt = attributes.et1_police_txt;
        attributes.et2_taille_txt = attributes.et1_taille_txt;
        attributes.et2_xoffset = attributes.et1_xoffset;
        attributes.et2_yoffset = attributes.et1_xoffset;
        const source = event.item.layer.title;
        
        const handler = view.on("click", function (event) {
            // remove click event handler once user clicks on the view
            // to create a new feature
            handler.remove();
            event.stopPropagation();

            if (event.mapPoint) {
                const point = event.mapPoint.clone();
                point.z = undefined;
                point.hasZ = false;

                const editFeature = new Graphic({
                    geometry: point,
                    attributes: attributes
                });

                const params = {
                    source: source,
                    edits: {
                        addFeatures: [editFeature]
                    }
                };
                resolve(params)
            }
        })
    })
}
module.exports = addFromTemplate;
