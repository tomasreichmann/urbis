import { elements, shapes, shapesMap, elementsMap } from "../model/resources-modal";
import { intersection } from 'lodash';

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

export const normalizeToFunction = (item) => {
  return typeof item === 'function' ? item : () => item;
}

export const parseSpell = (components) => {
  const spell = components.reduce((spell, {strength = 1, slug}) => (
    {
      ...spell,
      [slug]: (spell[slug] || 0) + strength,
    }
  ), {
    range: 1,
    shape: 'field',
    exclude: 0,
    isValid: false,
  });

  const elementTypes = intersection(Object.keys(spell), elements.map(element => element.slug));

  if (components.length === 0) {
    spell.description = 'Add component cards to create a spell';
    return spell;
  }

  if (elementTypes.length > 1) {
    spell.description = `Spell is invalid! It contains more than one type of elements: ${elementTypes.join(', ')}.`;
    return spell;
  }

  if (elementTypes.length === 0) {
    spell.description = `Spell is invalid! Add at least one card of a single element is required.`;
    return spell;
  }

  spell.element = elementTypes[0];
  spell.strength = components.filter(component => component.slug === spell.element).length;

  const elementShapes = intersection(Object.keys(spell), shapes.map(shape => shape.slug));

  if (elementShapes.length > 1) {
    spell.description = `Spell is invalid! It contains more than one element shape: ${elementShapes.join(', ')}.`;
    return spell;
  }
  spell.shape = elementShapes[0] || spell.shape;
  spell.damage = (spell.extraDamage || 0) + (elementsMap[spell.element].damage || 0);

  const effects = [
    `This is a [${spell.element}|${spell.element}] spell`,
    ...shapesMap[spell.shape].effects,
    spell.exclude > 0 ? `except ${spell.exclude} field${spell.exclude > 1 ? 's' : ''}` : null,
    spell.damage > 0 ? `causes [wound|${spell.damage}] wound${spell.damage > 1 ? 's' : ''}` : null,
    ...elementsMap[spell.element].effects,
  ];

  spell.description = effects
    .map(effect => normalizeToFunction(effect)(spell))
    .filter(effect => effect !== null)
    .join(', ');
  spell.isValid = true;
  return spell;
}