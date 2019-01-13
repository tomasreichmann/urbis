import mapValues from "lodash/mapValues";
const rawBuildings = require("./buildings.json");
const production = require("./production.json");

export const buildings = mapValues(rawBuildings, (building, buildingKey) => {
  return {
    ...building,
    production: Object.keys(production)
      .filter(productionKey => production[productionKey].site === buildingKey)
      .map(productionKey => production[productionKey])
  };
});

export const buildingOrder = Object.keys(buildings).sort();

export const buildingList = buildingOrder.map(
  buildingKey => buildings[buildingKey]
);
