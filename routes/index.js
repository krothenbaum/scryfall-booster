const express = require("express");
const router = express.Router();
const cardRoutes = require("./card");
const boosterRoutes = require("./booster");

router.get("/status", (req, res) => res.send("OK"));

router.use("/card", cardRoutes);
router.use("/booster", boosterRoutes);

module.exports = router;
