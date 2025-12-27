const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Ride service is connected successfully...");
    })
    .catch((err) => console.error(err));
};

module.exports = connect;
