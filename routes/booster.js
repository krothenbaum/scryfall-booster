const express = require("express");
const boosterController = require("../controllers/booster");

const router = express.Router();

router.route("/:set").get(boosterController.get);

module.exports = router;
