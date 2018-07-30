const unitMap = {
  mm: {
    mm: 1,
    cm: 10,
    in: 1/25.4
  },
  cm: {
    mm: 0.1,
    cm: 1,
    in: 1/2.54,
  },
  in: {
    mm: 25.4,
    cm: 2.54,
    in: 1,
  }
};

export const convertToUnit = (str, toUnit = 'mm', map = unitMap) => {
  const supportedUnits = Object.keys(map);
  const reg = new RegExp(`([\\d\\.]+)(${supportedUnits.join('|')})?`);
  const [match, val, unit = 'mm'] = str.toString().match(reg);
  if (match && map.hasOwnProperty(unit) && map[unit].hasOwnProperty(toUnit)) {
    const multiplier = map[unit][toUnit];
    return parseFloat(val) * multiplier;
  }
  throw new Error(`Cannot convert ${str} to ${toUnit}`);
};
