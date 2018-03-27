const Card = require("../models/card");

const checkFoil = async () => {
  const random = Math.random();
  if (random < 0.24) {
    return true;
  }

  return false;
};

const checkMythic = async () => {
  const random = Math.random();
  if (random < 0.126) {
    return true;
  }
  return false;
};

const getRareOrMythic = async (set, rarity) => {
  const query = {
    set: set,
    rarity: rarity
  };

  const count = await Card.count(query).then(count => {
    return count;
  });

  const random = Math.floor(Math.random() * count);

  const card = await Card.findOne(query)
    .skip(random)
    .exec()
    .then(card => {
      return card;
    });

  return card;
};

const getUncommons = async (set, num) => {
  let uncommonsArray = [];
  let randomArray = [];
  let n = 0;
  const query = { set: set, rarity: "uncommon" };
  const count = await Card.count(query).then(count => {
    return count;
  });

  while (n < num) {
    const random = Math.floor(Math.random() * count);
    if (randomArray.indexOf(random) == -1) {
      randomArray.push(random);
      n++;
    }
  }

  for (let i = 0; i < num; i++) {
    const card = await Card.findOne(query)
      .skip(randomArray[i])
      .exec()
      .then(uncommon => {
        return uncommon;
      });
    uncommonsArray.push(card);
  }

  return uncommonsArray;
};

const getCommons = async (set, num) => {
  let commonsArray = [];
  let randomArray = [];

  let n = 0;

  const query = {
    set: set,
    rarity: "common",
    type_line: {
      $not: /^(basic land).*/i
    }
  };

  const count = await Card.count(query).then(count => {
    return count;
  });

  while (n < num) {
    const random = Math.floor(Math.random() * count);
    if (randomArray.indexOf(random) == -1) {
      randomArray.push(random);
      n++;
    }
  }
  // console.log(randomArray);
  // console.log(commonsArray);

  for (let i = 0; i < num; i++) {
    // console.log(randomArray[i]);
    const card = await Card.findOne(query)
      .skip(randomArray[i])
      .exec()
      .then(common => {
        return common;
      })
      .catch(error => {
        console.error(`Error getting commmons: ${error}`);
      });
    commonsArray.push(card);
  }

  return commonsArray;
};

const getBasicLand = async set => {
  const query = {
    set: set,
    type_line: /^(basic land).*/i
  };

  const count = await Card.count(query).then(count => {
    return count;
  });

  const random = Math.floor(Math.random() * count);

  const land = await Card.findOne(query)
    .skip(random)
    .then(card => {
      return card;
    });

  return land;
};

const getFoil = async set => {
  console.log("GETTING FOIL");
  const random = Math.random();
  console.log(random);
  let foilArray = [];

  switch (true) {
    case random < 1 / 128:
      console.log("Mythic");
      foilArray = await getRareOrMythic(set, "mythic");
      break;
    case random < 7 / 128:
      console.log("RARE");
      foilArray = await getRareOrMythic(set, "rare");
      break;
    case random < 1 / 16:
      console.log("BASIC");
      foilArray = await getBasicLand(set);
      break;
    case random < 3 / 16:
      console.log("UNCOMMON");
      foilArray = await getUncommons(set, 1);
      break;
    default:
      console.log("COMMON");
      foilArray = await getCommons(set, 1);
      break;
  }

  return foilArray;
};

const get = async (req, res, next) => {
  const set = req.params.set;
  const hasFoil = await checkFoil();
  const hasMythic = await checkMythic();
  let land,
    commons,
    uncommons,
    rareOrMythic,
    foil,
    booster = [];

  /*
    Build a random booster
    check if foil
    if foil get 9 commons and 1 foil Mythic, Rare, Uncommon, or common
    elseget 10 commons
    get 3 uncommons
    get one Mythic or rare
    get one basic land
    */
  console.log(hasFoil);
  land = await getBasicLand(set);
  if (hasFoil) {
    commons = await getCommons(set, 9);
    foil = await getFoil(set);
  } else {
    commons = await getCommons(set, 10);
  }

  uncommons = await getUncommons(set, 3);

  if (hasMythic) {
    rareOrMythic = await getRareOrMythic(set, "mythic");
  } else {
    rareOrMythic = await getRareOrMythic(set, "rare");
  }

  if (hasFoil) {
    booster = booster.concat(land, commons, uncommons, rareOrMythic, foil);
  } else {
    booster = booster.concat(land, commons, uncommons, rareOrMythic);
  }

  booster.forEach(card => {
    console.log(`${card.name} - ${card.rarity}`);
  });

  res.status(200).send(booster);
};

module.exports = { get };
