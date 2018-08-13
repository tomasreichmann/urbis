export const resourcesBasic = [
  {
    name: 'Fire',
    resource: { fire: 1 },
    count: 3,
  },
  {
    name: 'Water',
    resource: { water: 1 },
    count: 3,
  },
  {
    name: 'Frost',
    resource: { frost: 1 },
    count: 3,
  },
  {
    name: 'Lightning',
    resource: { lightning: 1 },
    count: 3,
  },
  {
    name: 'Rock',
    resource: { rock: 1 },
    count: 2,
  },
  {
    name: 'Hex',
    resource: { hex: 1 },
    count: 3,
  },
  {
    name: 'Life',
    resource: { life: 1 },
    count: 2,
  },
];

export const resourcesModal = [
  {
    name: 'Line shape',
    illustration: 'line',
    count: 2,
  },
  {
    name: 'Cone shape 2 fields wide and far',
    illustration: 'cone',
    count: 2,
  },
  {
    name: 'Circle shape around caster',
    illustration: 'circle',
    count: 2,
  },
  {
    name: 'ALL FIELDS!',
    illustration: 'all',
    count: 1,
  },
  {
    name: '+1 spread',
    illustration: 'spread',
    count: 2,
  },
  {
    name: '+1 range',
    illustration: 'range',
    count: 8,
  },
  {
    name: '+1 jump to next target in range',
    illustration: 'jump',
    count: 2,
  },
  {
    name: '+1 field excluded',
    illustration: 'exclude',
    count: 2,
  },
  {
    name: '+1 damage',
    illustration: 'damage',
    count: 2,
  },
];

export const resources = [
  ...resourcesBasic,
  ...resourcesModal,
];
