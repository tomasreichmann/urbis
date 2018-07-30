export const fields = [
  {
    key: 'grass',
    name: 'Grass',
    count: 10,
    color: 'grass',
    icon: 'grass',
    description: 'Pretty nice patch of grass. Doesn\'t do much. Good for picnics and wizard duels.'
  },
  {
    key: 'everburningBrazier',
    name: 'Everburning Brazier',
    count: 1,
    color: 'fire',
    icon: 'fire',
    description: 'Magical burning brazier. It has permanent [burning] status that cannot be removed by any means. The caster on this field can use an extra [fire|2] element card once per round.'
  },
  {
    key: 'pond',
    name: 'Pond',
    count: 1,
    color: 'water',
    icon: 'water',
    description: 'A calm pond with crystal clear water and tiny fish. It has permanent [wet] status that cannot be removed by any means. The caster on this field can an extra [water|2] element card once per round.'
  },
  {
    key: 'lightningRod',
    name: 'Lightning Rod',
    count: 1,
    color: 'lightning',
    icon: 'lightning',
    description: 'Someone placed a lightning rod here for some reason. The target on this field is immune to [lightning] damage. The caster on this field can use an extra [lightning|2] element card once per round.'
  },
  {
    key: 'glacier',
    name: 'Glacier',
    count: 1,
    color: 'frost',
    icon: 'frost',
    description: 'Why doesn\'t this melt? Good place to store beer, but very slippery. It has permanent [frost] status that cannot be removed by any means. The caster on this field can use an extra [frost|2] element card once per round.'
  },
  {
    key: 'pentagram',
    name: 'Pentagram',
    count: 1,
    color: 'hex',
    icon: 'hex',
    description: 'The blasphemous symbol hums ominously. Emos hangout around here a lot. The target that enters this field is cursed. The curse cannot be removed until the target leaves this field. The caster on this field can use an extra [hex|2] element card once per round.'
  },
  {
    key: 'divineChapel',
    name: 'Divine Chapel',
    count: 1,
    color: 'life',
    icon: 'life',
    description: 'This sacred ground radiates with healing energy and sexual frustration. The target on this field is healed 1 hitpoint at the end of the turn. Caster\s life spells heal one more wound.'
  },
  {
    key: 'quarry',
    name: 'Quarry',
    count: 1,
    color: 'rock',
    icon: 'rock',
    description: 'Rocks. Rocks everywhere!. The caster on this field can place a free rock at the end of the round.'
  },
  {
    key: 'bottomlessAbyss',
    name: 'Bottomless Abyss',
    count: 1,
    color: 'death',
    icon: 'death',
    description: 'The sound of a cracked skull echos from the abyss. The target that moves into this field is killed instantly.'
  },
  {
    key: 'wizardTower',
    name: 'Wizard tower',
    count: 1,
    color: 'hex',
    icon: 'hex',
    description: 'This tall spire denies both laws of physics and good taste. The caster on this field draws an extra element once per turn, all caster\'s spells deal 1 extra damage of the same type. Spell\'s maximum range doesn\'t apply against the target.'
  },
];

export const fieldMap = {
  grass: fields.find(item => item.key === 'grass'),
  everburningBrazier: fields.find(item => item.key === 'everburningBrazier'),
  pond: fields.find(item => item.key === 'pond'),
  lightningRod: fields.find(item => item.key === 'lightningRod'),
  glacier: fields.find(item => item.key === 'glacier'),
  pentagram: fields.find(item => item.key === 'pentagram'),
  divineChapel: fields.find(item => item.key === 'divineChapel'),
  quarry: fields.find(item => item.key === 'quarry'),
  bottomlessAbyss: fields.find(item => item.key === 'bottomlessAbyss'),
  wizardTower: fields.find(item => item.key === 'wizardTower'),
};