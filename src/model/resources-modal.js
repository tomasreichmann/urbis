export const elements = [
  {
    name: 'Fire',
    slug: 'fire',
    resource: { fire: 1 },
    damage: 0,
    effects: [
      'sets target fields [burning|on fire]',
      'dries [wet] targets',
      '[wet|thaws] [frozen] targets',
      ({strength}) => strength > 1 ? `spreads to ${strength-1} surrounding field${strength-1 > 1 ? 's' : ''}` : null,
    ],
    count: 3,
  },
  {
    name: 'Water',
    slug: 'water',
    resource: { water: 1 },
    damage: 0,
    effects: [
      'makes targets [wet]',
      'douses [burning] fields',
      ({strength}) => `moves targets ${strength} field away`,
    ],
    count: 3,
  },
  {
    name: 'Frost',
    slug: 'frost',
    resource: { frost: 1 },
    damage: 1,
    effects: [
      'has no effect on [burning] fields',
      '[frozen|freezes] [wet] targets',
      ({strength}) => strength > 1 ? `target must discard ${strength-1} component cards${strength-1 > 1 ? 's' : ''}` : null,
    ],
    count: 3,
  },
  {
    name: 'Lightning',
    slug: 'lightning',
    resource: { lightning: 1 },
    damage: 1,
    effects: [
      ({strength}) => `does ${strength} extra [lightning] damage to [wet] targets`,
    ],
    count: 3,
  },
  {
    name: 'Rock',
    slug: 'rock',
    resource: { rock: 1 },
    damage: 0,
    effects: [
      ({strength}) => `spawns ${strength} rock${strength > 1 ? 's' : ''}`,
    ],
    count: 2,
  },
  {
    name: 'Hex',
    slug: 'hex',
    resource: { hex: 1 },
    damage: 0,
    effects: [
      'curses targets',
      ({strength}) => `steals ${strength} random component card${strength > 1 ? 's' : ''}`,
    ],
    count: 3,
  },
  {
    name: 'Life',
    slug: 'life',
    resource: { life: 1 },
    damage: 0,
    effects: [
      'heals'
    ],
    count: 2,
  },
];
export const elementsMap = elements.reduce((map, element) => ({...map, [element.slug]: element}), {});

export const shapes = [
  {
    name: 'One field',
    illustration: 'oneField',
    effects: [
      ({range}) => `targets a field ${range} field${range > 1 ? 's' : ''} away from the caster`
    ],
    slug: 'field',
    count: 0,
  },
  {
    name: 'Line shape',
    illustration: 'line',
    effects: ['targets a line of fields from the caster'],
    slug: 'line',
    count: 2,
  },
  {
    name: 'Cone shape 2 fields wide and far',
    illustration: 'cone',
    effects: [
      ({range}) => `targets a cone of fields up to ${range + 1} field${range + 1 > 1 ? 's' : ''} away from the caster`
    ],
    slug: 'cone',
    count: 2,
  },
  {
    name: 'Circle shape around caster',
    illustration: 'circle',
    effects: [({range}) => `targets a circle of fields ${range} field${range > 1 ? 's' : ''} away from the caster`],
    slug: 'circle',
    count: 2,
  },
  {
    name: 'ALL FIELDS!',
    illustration: 'all',
    effects: ['targets the entire battlefield'],
    slug: 'all',
    count: 1,
  },
  {
    name: 'Anywhere',
    illustration: 'anywhere',
    effects: ['targets a field anywhere on the battlefield'],
    slug: 'anywhere',
    count: 1,
  },
];

export const shapesMap = shapes.reduce((map, shape) => ({...map, [shape.slug]: shape}), {});

export const modifiers = [
  {
    name: '+1 spread',
    illustration: 'spread',
    slug: 'spread',
    count: 2,
  },
  {
    name: '+1 range',
    illustration: 'range',
    slug: 'range',
    count: 5,
  },
  {
    name: '+2 range',
    illustration: 'range',
    strength: 2,
    slug: 'range',
    count: 3,
  },
  {
    name: '+1 jump to next target in range',
    illustration: 'jump',
    slug: 'jump',
    count: 2,
  },
  {
    name: '+1 field excluded',
    illustration: 'exclude',
    slug: 'exclude',
    count: 2,
  },
  {
    name: '+1 damage',
    illustration: 'damage',
    slug: 'extraDamage',
    count: 2,
  },
];
export const modifiersMap = modifiers.reduce((map, modifier) => ({...map, [modifier.slug]: modifier}), {});

export const resources = [
  ...elements,
  ...shapes,
  ...modifiers,
];
