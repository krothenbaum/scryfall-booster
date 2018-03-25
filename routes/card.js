const express = require("express");
const cardController = require("../controllers/card");

const router = express.Router();

router
  .route("/")
  .get(cardController.get)
  .post(cardController.create);

router.route("/commons/:set").get(cardController.getRandomCommons);

module.exports = router;
