const renderer = {
    type: "unique-value",  // autocasts as new UniqueValueRenderer()
    field: "Automate24_24",
    defaultSymbol: { type: "simple-marker" },  // autocasts as new SimpleFillSymbol()
    uniqueValueInfos: [{
      // All features with value of "North" will be blue
      value: "Oui",
      symbol: {
        type: "simple-marker",  // autocasts as new SimpleFillSymbol()
        color: "blue"
      }
    }, {
      // All features with value of "East" will be green
      value: "Non",
      symbol: {
        type: "simple-marker",  // autocasts as new SimpleFillSymbol()
        color: "red"
      }
    }]
  };

  module.exports = renderer;