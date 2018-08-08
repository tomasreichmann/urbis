export const FIELD = 'FIELD';
export const LINE = 'LINE';
export const CONE = 'CONE';
export const ALL_FIELDS = 'ALL_FIELDS';
export const SELF = 'SELF';

export const targetShapes = []

export const spells = [
  {
    name: 'Roman candle',
    cost: { fire: 1 },
    target: {
      shape: FIELD,
      range: 2
    },
    description: 'Casts a flare that sets the [burning] status on a field on caster\'s field or up to 2 fields away from the caster.'
  },
  {
    name: 'Grilling hands',
    cost: { fire: 2 },
    target: {
      shape: CONE,
      size: 2,
      range: 1
    },
    description: 'Casts a burst of fire that sets the [burning] status on all the fields in an a small arc 2 fields away from the caster.'
  },
  {
    name: 'Fireball',
    cost: { fire: 3 },
    target: {
      shape: FIELD,
      spread: 1,
      maxRange: 2
    },
    description: 'Casts an explosion of fire that sets the [burning] status on all the fields with the center on the caster or up to 2 fields away from the caster spreading 1 field away from the center.'
  },
  {
    name: 'Meteor',
    cost: { fire: 4 },
    target: {
      shape: FIELD,
      spread: 2
    },
    description: 'Casts an explosion of fire that sets the [burning] status on all the fields spreading 2 fields away from it\'s center anywhere on the battlefield.'
  },
  {
    name: 'Floor is lava',
    cost: { fire: 5 },
    target: {
      shape: ALL_FIELDS
    },
    description: 'Casts a rain of burning magma that sets the [burning] status on all the fields on the entire battlefield.'
  },
  {
    name: 'Splash',
    cost: { water: 1 },
    target: {
      shape: FIELD,
      maxRange: 2
    },
    description: 'Casts a splash of water that sets the [wet] status on the caster or a target up to 2 fields away from the caster and moves target 1 field in any direction.'
  },
  {
    name: 'Tidal wave',
    cost: { water: 2 },
    target: {
      shape: CONE,
      size: 2,
      range: 0
    },
    description: 'Casts a stream of water that sets the [wet] status on all the targets in an a small arc 2 fields away from the caster and moves tarets 1 field away from the caster. If it\s not clear where to move, the caster decides which field to move to.'
  },
  {
    name: 'Water bomb',
    cost: { water: 3 },
    target: {
      shape: FIELD,
      spread: 1,
      maxRange: 2
    },
    description: 'Casts an explosion of water that sets the [wet] status on all the targets with the center up to 2 fields away from the caster spreading 1 field away from it\'s center and moves targets 1 field away from the center.'
  },
  {
    name: 'Geysir',
    cost: { water: 4 },
    target: {
      shape: FIELD,
      spread: 2
    },
    description: 'Casts an explosion of water that sets the [wet] status on all the targets spreading 2 fields away from it\`s center anywhere on the battlefield and moves targets 1 field away from the center. If it\s not clear where to move, the caster decides which field to move to.'
  },
  {
    name: 'Tsunami',
    cost: { water: 5 },
    target: {
      shape: ALL_FIELDS
    },
    description: 'Casts a wall of water quickly moving across battlefield that sets the [wet] status on all the targets on the entire battlefield and move them 1 field in a single direction of casters choice.'
  },
  {
    name: 'Electric jolt',
    cost: { lightning: 1 },
    damage: { lightning: 1 },
    target: {
      shape: FIELD,
      maxRange: 2
    },
    description: 'Casts a lightning arc to a single target up to 2 fields away from the caster that does [lightning|1] damage. [wet] target receives an extra [lightning|1] damage.'
  },
  {
    name: 'Tesla coil',
    cost: { lightning: 2 },
    damage: { lightning: 1 },
    target: {
      shape: FIELD,
      maxRange: 0,
      spread: 1,
      excludeCaster: true,
    },
    description: 'Casts a lightning arc to all targets 1 field away from the caster that does [lightning|1] damage. [wet] targets receive an extra [lightning|1] damage.'
  },
  {
    name: 'Lighning bolt',
    cost: { lightning: 3 },
    damage: { lightning: 1 },
    target: {
      shape: LINE,
    },
    description: 'Casts a lightning arc in a line in any direction from the caster to the end of battlefield that does [lightning|1] damage. [wet] targets receive an extra [lightning|1] damage.'
  },
  {
    name: 'Chain lightning',
    cost: { lightning: 4 },
    damage: { lightning: 1 },
    target: {
      shape: FIELD,
      jump: {
        count: 3,
        maxRange: 2
      }
    },
    description: 'Casts a lightning arc to a single target anywhere on the battlefield that does [lightning|1] damage, then jumps 2x to another target up to 2 fields away from the previous target. [wet] targets receive an extra [lightning|1] damage. No target can be damaged twice with one casting of this spell.'
  },
  {
    name: 'Lightning strike',
    cost: { lightning: 5 },
    damage: { lightning: 3 },
    target: {
      shape: FIELD
    },
    description: 'Casts a lightning strike to a single target anywhere on the battlefield that does [lightning|3] damage. If the target field is [wet], any targets that stand on [wet] fields that are connected to the target field with an unbroken chain of [wet] fields receive [lightning|1] damage. [wet] targets receive an extra [lightning|1] damage.'
  },
  {
    name: 'Chilling gaze',
    cost: { frost: 1 },
    damage: { frost: 1 },
    target: {
      shape: FIELD,
      maxRange: 2
    },
    description: 'Casts a freezing gaze that does [frost|1] damage to the target on a field up to 2 fields away from the caster. If the target is [wet] it replaces the [wet] status with the [frost] status.'
  },
  {
    name: 'Cone of cold',
    cost: { frost: 2 },
    damage: { frost: 1 },
    target: {
      shape: CONE,
      size: 2,
      range: 0
    },
    description: 'Casts a wave of ice that does [frost|1] damage to all the targets in an a small arc 2 fields away from the caster. If any affected targets are [wet] it replaces the [wet] status with the [frost] status.'
  },
  {
    name: 'Snow ball',
    cost: { frost: 3 },
    damage: { frost: 1 },
    target: {
      shape: FIELD,
      spread: 1,
      maxRange: 2
    },
    description: 'Casts an explosion of ice that does [frost|1] damage to all the targets with the center up to 2 fields away from the caster spreading 1 field away from it\'s center. If any affected targets are [wet] it replaces the [wet] status with the [frost] status.'
  },
  {
    name: 'Arctic blast',
    cost: { frost: 4 },
    damage: { frost: 1 },
    target: {
      shape: FIELD,
      spread: 2
    },
    description: 'Casts an explosion of ice that does [frost|1] damage to all the targets spreading 2 fields away from it\`s center anywhere on the battlefield. If any affected targets are [wet] it replaces the [wet] status with the [frost] status.'
  },
  {
    name: 'Blizzard',
    cost: { frost: 5 },
    damage: { frost: 1 },
    target: {
      shape: ALL_FIELDS
    },
    description: 'Casts a blizzard that does [frost|1] damage to all the targets on the entire battlefield. If any affected targets are [wet] it replaces the [wet] status with the [frost] status.'
  },
  {
    name: 'Summon rocks',
    cost: { rock: [1, 4] },
    target: {
      shape: FIELD,
      maxRange: 2
    },
    description: 'Summons rocks on unoccupied fields up to 2 fields away from the caster equal to the number of rock elements used. The rocks block movement. They are immune to all statuses, extra immunities. Rocks can only be destroyed by [lightning] damage, dispel or spells that explicitly target rocks.'
  },
  // {
  //   name: 'Summon a rock',
  //   cost: { rock: 1 },
  //   target: {
  //     shape: FIELD,
  //     maxRange: 2
  //   },
  //   description: 'Summons rocks on unoccupied field up to 2 fields away from the caster. The rock blocks movement and spells that target fields in a line, cone or spread. It is immune to fire and frost damage, but is destroyed when it takes 1 damage.'
  // },
  // {
  //   name: 'Summon two rocks',
  //   cost: { rock: 2 },
  //   target: {
  //     count: 2,
  //     shape: FIELD,
  //     maxRange: 2
  //   },
  //   description: 'Summons 2 rocks on unoccupied fields up to 2 fields away from the caster. The rocks block movement and spells that target fields in a line, cone or spread. They are immune to all statuses, extra immunities, fire and frost damage, but are destroyed when they take 1 damage of other type.'
  // },
  // {
  //   name: 'Summon three rocks',
  //   cost: { rock: 3 },
  //   target: {
  //     count: 3,
  //     shape: FIELD,
  //     maxRange: 2
  //   },
  //   description: 'Summons 3 rocks on unoccupied fields up to 2 fields away from the caster. The rocks block movement and spells that target fields in a line, cone or spread. They are immune to all statuses, extra immunities, fire and frost damage, but are destroyed when they take 1 damage of other type.'
  // },
  // {
  //   name: 'Summon four rocks',
  //   cost: { rock: 4 },
  //   target: {
  //     count: 4,
  //     shape: FIELD,
  //   },
  //   description: 'Summons 4 rocks on unoccupied fields anywhere on the battlefield. The rocks block movement and spells that target fields in a line, cone or spread. They are immune to all statuses, extra immunities, fire and frost damage, but are destroyed when they take 1 damage of other type.'
  // },
  {
    name: 'Rockslide',
    cost: { rock: 5 },
    target: {
      shape: ALL_FIELDS,
    },
    description: 'Summons rocks on all unoccupied grass fields anywhere on the battlefield. The rocks block movement. They are immune to all statuses, extra immunities. Rocks can only be destroyed by [lightning] damage, dispel or spells that explicitly target rocks.'
  },
  {
    name: 'Fire immunity',
    cost: { hex: 1, fire: 1 },
    target: {
      shape: FIELD,
      maxRange: 2
    },
    description: 'The caster or a target up to 2 fields away from the caster becomes immune to all spells that contain the [fire] element as well as the [burning] status. This also removes any currently active [burning] and [cursed] statuses and any other immunities from the target.'
  },
  {
    name: 'Water immunity',
    cost: { hex: 1, water: 1 },
    target: {
      shape: FIELD,
      maxRange: 2
    },
    description: 'The caster or a target up to 2 fields away from the caster becomes immune to all spells that contain the [water] element as well as the [wet] status. This also removes any currently active [wet] and [cursed] statuses and any other immunities from the target.'
  },
  {
    name: 'Lightning immunity',
    cost: { hex: 1, lightning: 1 },
    target: {
      shape: FIELD,
      maxRange: 2
    },
    description: 'The caster or a target up to 2 fields away from the caster becomes immune to all spells that contain the [lightning] element. This also removes a [cursed] status and any other immunities from the target.'
  },
  {
    name: 'Physical immunity',
    cost: { hex: 1, rock: 1 },
    target: {
      shape: FIELD,
      maxRange: 2
    },
    description: 'The caster or a target up to 2 fields away from the caster becomes immune to all spells that move him or result in dealing him physical damage. This also removes any other immunities from the target.'
  },
  {
    name: 'Frost immunity',
    cost: { hex: 1, frost: 1 },
    target: {
      shape: FIELD,
      maxRange: 2
    },
    description: 'The caster or a target up to 2 fields away from the caster becomes immune to all spells that contain the [frost] element as well as the [frozen] status. This also removes any currently active [frozen] and [cursed] statuses and any other immunities from the target.'
  },
  {
    name: 'Life immunity',
    cost: { hex: 1, life: 1 },
    target: {
      shape: FIELD,
      maxRange: 2
    },
    description: 'The caster or a target up to 2 fields away from the caster becomes immune to all spells that contain the [life] element. This also removes any currently active [cursed] statuses and any other immunities from the target.'
  },
  {
    name: 'Healing',
    cost: { life: [1, 3] },
    target: {
      shape: FIELD,
      maxRange: 2
    },
    description: 'A target up to 2 fields away from the caster heals [wound|1 - 3].'
  },
  {
    name: 'Resurrection',
    cost: { life: 4 },
    target: {
      shape: FIELD,
      maxRange: 2
    },
    description: 'A target anywhere on the battlefield is brought back to life on the same field it died and has damage immunity untill its turn. If cast on the caster, it will fully heal the caster when he is about to die thus preventing death.'
  },
  {
    name: 'Curse',
    cost: { hex: 1 },
    target: {
      shape: FIELD,
      maxRange: 2
    },
    description: 'The caster or a target up to 2 fields away from the caster gains the [cursed] status and looses any immunities. If the target has any spare elements, the caster also steals one of the target\'s elements at random.'
  },
  {
    name: 'Dispel',
    cost: { hex: 2 },
    target: {
      shape: FIELD,
      maxRange: 2
    },
    description: 'The caster or a target up to 2 fields away from the caster looses all statuses and immunities.'
  },
  {
    name: 'Dispel all',
    cost: { hex: 3 },
    target: {
      shape: FIELD,
      maxRange: 2
    },
    description: 'All statuses and immunities are removed from the whole battlefield and it\'s targets.'
  },
  {
    name: 'Teleport',
    cost: { lightning: 1, life: 1 },
    target: {
      shape: FIELD
    },
    description: 'The caster is teleported to any field on the map. If the target field is occupied, the contents is teleported to the caster\'s original field.'
  },
  {
    name: 'Telekinesis',
    cost: { lightning: 1, water: 1, hex: 1 },
    target: {
      shape: FIELD,
      maxRange: 2
    },
    description: 'Moves a target up to two fields away from the caster to an unoccupied field up to 2 fields away from the target.'
  },
  {
    name: 'Inversion',
    cost: { frost: 1, fire: 1 },
    target: {
      shape: FIELD,
      maxRange: 0,
      spread: 1,
      excludeCaster: true,
    },
    description: 'All [burning] fields turn [frozen] and all [frozen] fields turn [burning] in a circle 2 fields away from the caster.'
  },
  {
    name: 'Burning oil',
    cost: { water: 1, fire: 1 },
    target: {
      shape: FIELD,
      maxRange: 0,
      spread: 1,
      excludeCaster: true,
    },
    description: 'One [wet] field and all it\'s connected [wet] fields anywhere on the battlefield turn [burning].'
  },
  {
    name: 'Refreshments',
    cost: { life: 1, water: 1 },
    target: {
      shape: FIELD,
      maxRange: 0,
      spread: 1,
      excludeCaster: true,
    },
    description: 'All targets in a circle 2 fields away from the caster are healed [wound|1].'
  },
];


// {
//   name: 'Thermo\u200Bmeter',
//   resource: { fire: 1, frost: 1 },
//   count: 1,
// },
// {
//   name: 'Oil',
//   resource: { fire: 1, water: 1 },
//   count: 1,
// },
// {
//   name: 'Coconut',
//   resource: { life: 1, water: 1 },
//   count: 1,
// },
// {
//   name: 'Graphite',
//   resource: { lightning: 1, rock: 1 },
//   count: 1,
// },
// {
//   name: 'Frozen lightning',
//   resource: { lightning: 1, frost: 1 },
//   count: 1,
// },
// {
//   name: 'Mandrake root',
//   resource: { life: 1, hex: 1 },
//   count: 1,
// },
// {
//   name: 'Stone rune',
//   resource: { rock: 1, hex: 1 },
//   count: 1,
// },