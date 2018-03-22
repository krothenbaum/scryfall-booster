require('dotenv').config();
// const bodyParser = require('body-parser');
const express = require('express'); // Express web server framework
const request = require('request'); // "Request" library
const cors = require('cors');

const app = express();
const router = express.Router();

const client_id = process.env.client_id;
const client_secret = process.env.client_secret;

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.get('/auth', (req, res) => {
  let auth_token;
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      auth_token = body.access_token;
      res.status(200).send({token: auth_token});
    }
  });
});

app.listen(process.env.PORT || 3000, () => {
  // eslint-disable-next-line no-console
});

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
