const Card = require("../models/card.js");

const get = (req, res) => {
  console.log("controller get function");
  // return res.json(req.card);
  Card.get()
    .then(card => {
      console.log(card);
    })
    .catch(error => {
      console.error(error);
    });
};

module.exports = { get };
