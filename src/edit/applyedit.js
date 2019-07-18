
  // Call FeatureLayer.applyEdits() with specified params.
const edition = (obj, listSource, listClient, ws) => {
  return new Promise(function (resolve, reject) {
    listSource.forEach(element => {
      if(element.title === obj.source){
        element.applyEdits(obj.edits).then((editsResult) => {
          listClient.forEach(element => {
            if(element.title === obj.source){
              element.applyEdits(obj.edits);
            }
          });
         })
           .catch(function (error) {
             console.log("===============================================");
             console.error("[ applyEdits ] FAILURE: ", error.code, error.name,
               error.message);
             console.log("error = ", error);
           });
      }
    });
  })
  }
 module.exports = edition 