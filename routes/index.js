const express = require("express");
const router = express.Router();
const cardRoutes = require("./card");

router.get("/status", (req, res) => res.send("OK"));

router.use("/card", cardRoutes);

module.exports = router;
