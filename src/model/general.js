const resources = require("./resources.json");

export const marketResourceOrder = [
  "food",
  "wood",
  "stone",
  "metal",
  "crops",
  "herbs",
  "cattle",
  // "horse",
  "leather",
  "fabric",
  "clothes",
  "tools",
  "armaments",
  "alcohol",
  // "books",
  "medicine"
  // "jewelry",
  // "art"
];

export const resourceDemand = Object.keys(resources)
  .filter(resourceKey => resources[resourceKey].consumptionStartYear)
  .map(resourceKey => {
    return {
      resourceKey,
      consumption: resources[resourceKey].consumption,
      consumptionStartYear: resources[resourceKey].consumptionStartYear
    };
  });
export const maxPopulation = 24;
export const populationPerDemand = 4;
export const getDemand = population =>
  Math.floor(population / populationPerDemand);

export const priceRanges = ["high", "regular", "low"];

export const seasons = ["spring", "summer", "autumn", "winter"];
