
export const avatars = [
  {
    imageUri: 'https://i.imgur.com/puSgvt0.png',
    color: 'fire',
    width: '1in',
    height: '2in',
  },
  {
    imageUri: 'https://i.imgur.com/fd4O3pE.jpg',
    color: 'frost',
    width: '1in',
    height: '2in',
  },
  {
    imageUri: 'https://i.imgur.com/DY8OR54.jpg',
    color: 'lightning',
    width: '1in',
    height: '2in',
  },
  {
    imageUri: 'https://i.imgur.com/8OagbWD.jpg',
    color: 'grass',
    width: '1in',
    height: '2in',
  },
];

export const targets = [
  {
    imageUri: 'https://i.imgur.com/eYfJbcD.jpg',
    color: 'fire',
    width: '1in',
    height: '1in',
  },
  {
    imageUri: 'https://i.imgur.com/qYiL9sh.jpg',
    color: 'frost',
    width: '1in',
    height: '1in',
  },
  {
    imageUri: 'https://i.imgur.com/ygVCdZ2.jpg',
    color: 'lightning',
    width: '1in',
    height: '1in',
  },
  {
    imageUri: 'https://i.imgur.com/ojml7NI.jpg',
    color: 'grass',
    width: '1in',
    height: '1in',
  },
];

export const startingPlayer = {
  imageUri: 'https://i.imgur.com/qYiL9sh.jpg',
  width: '1in',
  height: '1in',
};

export const rock = {
  imageUri: 'https://i.imgur.com/b7DnzXx.png',
  color: 'rock',
  width: '1in',
  height: '1in',
  count: 10,
};

export const burning = {
  imageUri: 'https://i.imgur.com/jsTojqV.jpg',
  color: 'fire',
  width: '1in',
  height: '1in',
  count: 10,
};

export const wet = {
  imageUri: 'https://i.imgur.com/dDFP2vQ.jpg',
  color: 'water',
  width: '1in',
  height: '1in',
  count: 10,
};

export const frozen = {
  imageUri: 'https://i.imgur.com/bNy70HC.jpg',
  color: 'frost',
  width: '1in',
  height: '1in',
  count: 10,
};

export const minis = [
  ...avatars,
  startingPlayer,
  rock,
  burning,
  wet,
  frozen
]