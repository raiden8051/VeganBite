const mongoose = require("mongoose");
const mongoURL =
  "mongodb+srv://raiden8051:raiden8051@veganbitecluster.cgui4sg.mongodb.net/vegandb?retryWrites=true&w=majority";

const connectDB = async () => {
  mongoose
    .connect(mongoURL)
    .then(async () => {
      // if all is ok we will be here
      console.log("Connection to database established");
      await getUsers()
        .then((res) => {
          global.foodData = res;
        })
        .catch((err) => {
          console.log("error");
        });
    })
    .catch((err) => {
      // we will not be here...
      console.error("App starting error:");
      process.exit(1);
    });
};

function getUsers() {
  return new Promise(function (resolve, reject) {
    mongoose.connection.db
      .collection("food_master")
      .find({})
      .toArray()
      .then((res) => {
        return resolve(res);
      })
      .catch((err) => {
        return reject(err);
      });
  });
}

module.exports = connectDB();
