const mongoose = require("mongoose");
const colors = require("./index");

mongoose
  .connect("mongodb://localhost:27017/JWTUser")
  .then(() => {
    console.log("Connect Successfully to the MongoDB".green);
  })
  .catch((Error) => {
    console.log("Error Connecting to Server".red);
    console.log(Error);
  });

module.exports = mongoose;
