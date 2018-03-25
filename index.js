require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const helmet = require("helmet");
const cors = require("cors");
const fs = require("fs");
const morgan = require("morgan");

const app = express();
const routes = require("./routes/index.js");

app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use("/", routes);

// mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI);
mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: ${process.env.MONGO_URI}`);
});

app.listen(process.env.PORT, () => {
  console.info(`Server started on ${process.env.PORT}`);
});

module.exports = app;
