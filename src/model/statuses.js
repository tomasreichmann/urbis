export const statuses = [
  {
    name: '[burning|Burning]',
    effects: [
      'Any targets that are in a [burning] zone at the end of the round receive [fire|1] damage.',
      'If the zone has [wet] status and is about to get a [burning] status, it instead looses this status and doesn\'t get any new ones.',
    ]
  },
  {
    name: '[wet|Wet]',
    effects: [
      'Any targets in the [wet] zone that are are about to receive [lightning] damage receive 1 extra [lightning] damage.',
      'If the zone has a [burning] status and is about to receive a [wet] status, it instead looses this status and doesn\'t get any new ones.',
    ],
  },
  {
    name: '[frozen|Frozen]',
    effects: [
      'A [wet] zone that is a target of a freezing spell looses the [wet] status and gains a [frozen] status instead.',
      'A target cannot move while the zone is [frozen].',
      'A [frozen] zone that is a target of a [fire] spell looses the [frozen] status and gains a [wet] status instead.',
    ],
  },
  {
    name: '[cursed|Cursed]',
    effects: [
      'A zone cannot be cursed',
      'A target that is cursed can only make spells with the total of 4 elements per round.',
      'The [cursed] status is replaced by any other [hex] statuses, like Fire Immunity.',
    ],
  },
];
