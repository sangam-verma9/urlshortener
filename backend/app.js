const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

const url = require("./routes/urlRoute");
app.use("/api/v1", url);

module.exports = app;
