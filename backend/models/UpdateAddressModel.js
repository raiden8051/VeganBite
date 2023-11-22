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
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  pin: {
    type: String,
    required: true,
  },
  street: {
    type: Array,
    required: false,
  },
});

module.exports = mongoose.model("user_address", UpdateAddressModel);
