const selectExistingFeature = (view, fls) => {
  return new Promise(function (resolve, reject) {
    view.on("click", (event) => {
      // clear previous feature selection
      view.hitTest(event).then((response) => {
        // If a user clicks on an incident feature, select the feature.
        if (response.results.length === 0) {
        }
        else if (response.results[0].graphic) {
          const source = response.results[0].graphic.sourceLayer;
          const objectId = response.results[0].graphic.attributes;
          fls.forEach(element => {
            if (element === source)
              resolve({ view: view, source: element, objectId: objectId[element.objectIdField] })
          });
        }
      });
    });
  })
}

module.exports = selectExistingFeature;