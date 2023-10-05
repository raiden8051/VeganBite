const mongoose = require("mongoose");
const mongoURL =
  "mongodb+srv://raiden8051:raiden8051@veganbitecluster.cgui4sg.mongodb.net/vegandb?retryWrites=true&w=majority";

const connectDB = () => {
  mongoose
    .connect(mongoURL)
    .then(() => {
      // if all is ok we will be here
      console.log("Connection to database established");
    })
    .catch((err) => {
      // we will not be here...
      console.error("App starting error:", err.stack);
      process.exit(1);
    });
};

module.exports = connectDB();
