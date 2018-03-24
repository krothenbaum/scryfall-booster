const express = require("express");
const cardController = require("../controllers/card.js");

const router = express.Router();

router.route("/").get(cardController.get);

module.exports = router;
