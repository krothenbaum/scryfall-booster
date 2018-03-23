require("dotenv").config();
// const bodyParser = require('body-parser');
const express = require("express"); // Express web server frameworkyarn
const axios = require("axios");
const cors = require("cors");
const fs = require("fs");

const app = express();
const router = express.Router();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

const buildCommonsArray = async commons => {
  const commonsArray = commons.map(card => {
    return card;
  });
  console.log(commonsArray);
};

const scryfallSearch = async () => {
  try {
    const url = "https://api.scryfall.com/cards/search";
    const response = await axios.get(url, {
      params: {
        q: "s:rix not:pwdeck"
      }
    });
    return response.data;
    // buildCommonsArray(response.data);
  } catch (err) {
    console.error(err);
  }
};

app.get("/", (req, res) => {
  console.log("HELLO!");
  scryfallSearch().then(set => {
    const xln = JSON.stringify(set.data);
    console.log(xln);
    fs.writeFileSync("rix.json", xln);
  });
});

app.listen(process.env.PORT, () => {
  console.info(`Server started on ${process.env.PORT}`);
});

module.exports = app;

// "use strict";

// const Scry = require("scryfall-sdk");

// const getRandomCard = async () => {
//   return await Scry.Cards.random();
// };

// const buildRandomCommons = commons => {
//   console.log(commons.name);
// };

// const getCommonsBySetCode = setCode => {
//   let commonsArray = [];
//   Scry.Cards.search(`s:${setCode} r:c not:pwdeck`).on("data", card => {
//     console.log(card.id);
//     commonsArray.push(card.id);
//   });
//   console.log(commonsArray);
// };

// const generateBooster = setCode => {
//   getCommonsBySetCode(setCode);
// };

// generateBooster("hou");
