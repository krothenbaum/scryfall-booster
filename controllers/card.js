const Card = require("../models/card");

const get = async (req, res, next) => {
  console.log("Controller get function");
  // return res.json(req.card);
  // Card.get()
  //   .then(card => {
  //     console.log(card);
  //   })
  //   .catch(error => {
  //     console.error(error);
  //   });
  await Card.findOne({ name: "Adanto Vanguard" })
    .exec()
    .then(card => {
      console.log(card);
    })
    .catch(error => {
      console.error(error);
    });
};

const getRandomCommons = async (req, res, next) => {
  await Card.find({
    set: req.params.set,
    rarity: "common"
  })
    .limit(10)
    .exec()
    .then(cards => {
      cards.forEach(card => {
        res.json(card);
      });
    });
};

const create = async (req, res, next) => {
  console.log(`CREATE FUNCTION`);
  console.log(req.body);
  const card = new Card({
    name: req.body.name
  });

  await card
    .save()
    .then(savedCard => {
      res.json(savedCard);
    })
    .catch(error => {
      console.error(error);
    });
};

module.exports = { get, create, getRandomCommons };
