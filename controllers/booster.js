const Card = require("../models/card");

const foil = () => {
  const random = Math.random();
  console.log(`RANDOM NUMBER IS ${random}`);
  if (random < 0.24) {
    return true;
  }

  return false;
};

const getUncommons = async (set, num) => {
  console.log("GETTING UNCOMMONS");
  let uncommonsArray = [];
  const query = { set: set, rarity: "uncommon" };
  const count = await Card.count(query).then(count => {
    return count;
  });

  for (let i = 0; i < num; i++) {
    const random = Math.floor(Math.random() * count);
    const card = await Card.findOne(query)
      .skip(random)
      .exec()
      .then(uncommon => {
        return uncommon;
      });
    uncommonsArray.push(card);
  }

  return uncommonsArray;
};

const getCommons = async (set, num) => {
  console.log("GETTING COMMONS");
  let commonsArray = [];
  const query = { set: set, rarity: "common" };
  const count = await Card.count(query).then(count => {
    return count;
  });

  for (let i = 0; i < num; i++) {
    const random = Math.floor(Math.random() * count);
    const card = await Card.findOne(query)
      .skip(random)
      .exec()
      .then(common => {
        return common;
      });
    commonsArray.push(card);
  }

  return commonsArray;
};

const getFoil = set => {
  console.log("GETTING FOIL");
  return;
};

const get = async (req, res, next) => {
  console.log("BOOSTER GET FUNCTION");
  const set = req.params.set;
  let commons,
    uncommons = [];
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
    commons = await getCommons(set, 9);
    getFoil(set);
  } else {
    commons = await getCommons(set, 10);
  }

  uncommons = getUncommons(set, 3);
  //   getRareOrMythic(set);
  //   getBasicLand(set);
  res.status(200);
};

module.exports = { get };
