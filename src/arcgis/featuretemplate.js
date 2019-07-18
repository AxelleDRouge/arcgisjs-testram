import FeatureTemplates from "esri/widgets/FeatureTemplates";
import addFromTemplate from '../edit/add';
import edition from '../edit/applyedit'

const featureTemplates = (container, fls, view, flssource, ws) => {
    return new Promise(function (resolve, reject) {
        const templates = new FeatureTemplates({
            container: container,
            layers: fls
        });

        // Listen for when a template item is selected
        templates.on("select", (evtTemplate) => {
           addFromTemplate(evtTemplate, view)
           .then((obj)=>{
            edition(obj, flssource, fls, ws)
           })
        })
        resolve(templates)
    })
}
module.exports = featureTemplates;
