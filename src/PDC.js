const myType = "grass";
const opType = "grass";
const attack = 60;
const defence = 40;

const effectivness = {
  fire: {
    fire: 0.5,
    grass: 2.0,
    water: 0.5,
    electric: 1.0
  },
  grass: {
    fire: 0.5,
    grass: 0.5,
    water: 2.0,
    electric: 1.0
  },
  water: {
    fire: 2.0,
    grass: 0.5,
    water: 0.5,
    electric: 0.5
  },
  electric: {
    fire: 1.0,
    grass: 1.0,
    water: 2.0,
    electric: 0.5
  }
};

function calculateDamage(myType, opType, attack, defence) {
  return Math.ceil(50 * (attack / defence) * effectivness[myType][opType]);
}

console.log(calculateDamage(myType, opType, attack, defence));
