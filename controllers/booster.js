const Card = require("../models/card");

const foil = () => {
  const random = Math.random();
  console.log(`RANDOM NUMBER IS ${random}`);
  if (random < 0.24) {
    return true;
  }

  return false;
};

const getCommons = async (set, num) => {
  console.log("GETTING COMMONS");
  let commonsArray = [];
  const count = await Card.count({ set: set }).then(count => { return count });

  for (let i = 0; i < num; i++) {
    const random = Math.floor(Math.random() * count);
    const card = await Card
      .find({ set: set, rarity: "common" })
      .skip(random)
      .exec()
      .then(common => { return common });
    console.log(`CARD IS ${card}`);
    commonsArray.push(card);
  }

  return;
};

const getFoil = set => {
  console.log("GETTING FOIL");
  return;
};

const get = async (req, res, next) => {
  console.log("BOOSTER GET FUNCTION");
  const set = req.params.set;

  console.log(`SET is ${set}`);
  /*
    Build a random booster
    check if foil
    if foil get 9 commons and 1 foil Mythic, Rare, Uncommon, or common
    elseget 10 commons
    get 3 uncommons
    get one Mythic or rare
    get one basic land
    */

  if (foil()) {
    getCommons(set, 9);
    getFoil(set);
  } else {
    getCommons(set, 10);
  }

  //   getUncommons(set, 3);
  //   getRareOrMythic(set);
  //   getBasicLand(set);
  // console.log(`COMMONS ARE ${commons[0]}`);
  res.status(200);
};

module.exports = { get };
