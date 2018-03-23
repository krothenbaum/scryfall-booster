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

const getSetData = async () => {
  try {
    const url = "https://api.scryfall.com/cards/search";
    const response = await axios.get(url, {
      params: {
        q: "s:xln not:pwdeck",
        page: 2
      }
    });
    return response.data;
    // buildCommonsArray(response.data);
  } catch (err) {
    console.error(err);
  }
};

const getBooster = async () => {
  console.log("GENERATING BOOSTER...");
  //get if foil
  //if foil === true get 9 uncommons and 1 foil Mythic, Rare, Uncommon, or Common
  //else get 10 commons
  //get 3 uncommons
  //get Rare or Mythic - 1 in 8 mythic rare
  //get 1 basic land
  //return booster
};

app.get("/setdata", (req, res) => {
  console.log("Writing set data to JSON");
  getSetData().then(set => {
    const xln = JSON.stringify(set.data);
    fs.writeFileSync("xln2.json", xln);
  });
});

app.get("/booster", (req, res) => {
  console.log("BOOSTER");
  const set = "xln";
  const booster = getBooster(set);
});

app.listen(process.env.PORT, () => {
  console.info(`Server started on ${process.env.PORT}`);
});

module.exports = app;
