// This module perform the work to connection with db

const mongoose = require("mongoose");

function connectToDB() {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("connected to db");
    })
    .catch((error) => {
      console.log(`Error while connecting ${error}`);
    });
}
module.exports = connectToDB;
