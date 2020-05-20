import { paperSizes } from "./paperSizes";

const unitMap = {
  mm: {
    mm: 1,
    cm: 0.1,
    in: 1 / 25.4
  },
  cm: {
    mm: 10,
    cm: 1,
    in: 1 / 2.54
  },
  in: {
    mm: 25.4,
    cm: 2.54,
    in: 1
  }
};

export const convertToUnit = (str, toUnit = "mm", map = unitMap) => {
  const supportedUnits = Object.keys(map);
  const reg = new RegExp(`([\\d\\.]+)(${supportedUnits.join("|")})?`);
  const [match, val, unit = "mm"] = str.toString().match(reg);
  if (match && map.hasOwnProperty(unit) && map[unit].hasOwnProperty(toUnit)) {
    const multiplier = map[unit][toUnit];
    return parseFloat(val) * multiplier;
  }
  throw new Error(`Cannot convert ${str} to ${toUnit}`);
};

export const normalizeToFunction = item => {
  return typeof item === "function" ? item : () => item;
};

export const duplicateItems = (arr, count) =>
  arr.reduce((output, item) => {
    output.push(...Array(count).fill(item));
    return output;
  }, []);

export const itemsPerPage = ({
  item,
  page = paperSizes.portrait.A4,
  itemMargin = 0,
  pageMargin = "10mm",
  maxItemsPerPage = 1000,
  maxPages = 100
}) => {
  const UNIT = "mm";
  const inPixels = {
    page: {
      width: convertToUnit(page.width, UNIT),
      height: convertToUnit(page.height, UNIT)
    },
    item: {
      width: convertToUnit(item.width, UNIT),
      height: convertToUnit(item.height, UNIT)
    },
    pageMargin: convertToUnit(pageMargin, UNIT),
    itemMargin: convertToUnit(itemMargin, UNIT)
  };
  console.log("item", item);
  console.log("inPixels", inPixels);
  const printablePage = {
    width: inPixels.page.width - inPixels.pageMargin * 2,
    height: inPixels.page.height - inPixels.pageMargin * 2
  };

  console.log("printablePage.width", printablePage.width, inPixels.item.width);

  const itemsPerPageWidth = Math.floor(
    printablePage.width / inPixels.item.width
  );
  const itemsPerPageHeight = Math.floor(
    printablePage.height / inPixels.item.height
  );
  console.log("itemsPerPageWidth", itemsPerPageWidth);
  console.log("itemsPerPageHeight", itemsPerPageHeight);
  const itemsPerPage = Math.min(
    itemsPerPageWidth * itemsPerPageHeight,
    maxItemsPerPage
  );

  console.log("itemsPerPage", itemsPerPage);

  return itemsPerPage;
};
