const mongoose = require("mongoose");

const { Schema } = mongoose;

const UpdateAddressModel = new Schema({
  userId: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("user_address", UpdateAddressModel);
