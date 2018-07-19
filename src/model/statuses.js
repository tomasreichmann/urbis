export const statuses = [
  {
    name: '[burning|Burning]',
    zone: [
      'Any targets that are in the zone when it gets [burning] status, or targets entering a [burning] zone immediately get [burning] status themselves.',
      'If the target has [wet] status and is about to get a [burning] status, it instead looses [wet] status and doesn\'t get any new ones.',
    ],
    target: [
      'A target that finishes its turn having the [burning] status receives [fire|1] damage.',
      'A [burning] target can also cast extra [fire] element once per round.',
      'A [burning] target is immune to [frost] spells.',
    ],
  },
  {
    name: '[wet|Wet]',
    zone: [
      'Any targets that are in the zone when it gets the [wet] status, or targets entering a [wet] zone immediately get the [wet] status themselves.',
      'If the target has a [burning] status, it instead looses this status and doesn\'t get any new ones.',
    ],
    target: [
      'A [wet] target gets double lightning damage and cannot use any lightning elements.',
      'A [wet] target can also cast extra [water] element once per round.',
    ],
  },
  {
    name: '[frozen|Frozen]',
    zone: [
      'A [wet] zone that is a target of a freezing spell looses the [wet] status and gains a [frozen] status.',
      'A target that enters a [frozen] zone is moved one field in the same direction at the end of it\'s round, if the field is empty, or gains 1 physical damage if the field is not empty.',
      'A [frozen] zone that is a target of a [fire] spell looses the [frozen] status and gains a [wet] status instead.',
    ],
    target: [
      'A target that has the [wet] status and is a target of a freezing spell looses the [wet] status and gains [frozen] status.',
      'A target cannot move while it has the [frozen] status.',
      'A [wet] target that enters a [frozen] zone doesn\'t get the [frozen] status automatically.',
      'A [frozen] target can also cast extra [frost] element once per round.',
      'A [frozen] target that is a target of a [fire] spell looses the [frozen] status and gains a [wet] status instead.',
    ],
  },
  {
    name: '[cursed|Cursed]',
    zone: [
      'A zone cannot be cursed',
    ],
    target: [
      'A target that is cursed can only make spells with the total of 4 elements per round.',
      'The [cursed] status is replaced by any other [hex] statuses, like Fire Immunity.',
    ],
  },
];
