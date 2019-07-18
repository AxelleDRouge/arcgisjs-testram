import Graphic from 'esri/Graphic';
import Point from "esri/geometry/Point";

const wsBroadcast = (event, flClient) => {
    const data = JSON.parse(event.data)
    flClient.forEach(element => {
        if (element.layerId == data.layerUrl.slice(data.layerUrl.length-1)) {
            let edit = {};
            if(data.updates){
                const dataGraphic = new Graphic({
                    geometry: new Point(data.updates[0].geometry),
                    attributes: data.updates[0].attributes,
                })
                edit.updateFeatures=[dataGraphic]
                
            }
            else if(data.adds){
                const dataGraphic = new Graphic({
                    geometry: new Point(data.adds[0].geometry),
                    attributes: data.adds[0].attributes,
                })
                console.log(edit);
                edit.addFeatures = [dataGraphic]
                
            }
            console.log(edit);
            element.applyEdits(edit).then((editsResult) => {
            console.log(editsResult)
            })
                .catch(function (error) {
                    console.log("===============================================");
                    console.error("[ applyEdits ] FAILURE: ", error.code, error.name,
                        error.message);
                    console.log("error = ", error);
                });
        }
    });
}

module.exports = wsBroadcast
