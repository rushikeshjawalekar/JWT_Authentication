const express = require("express");
const app = express();
const colors = require("colors");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const mongoose = require("./connection");

const userSchema = require("./routes/personRoute");
app.use("/person", userSchema);

app.listen(8080, () => {
  console.log("Welcome To the Server".green);
});

module.exports = colors;
