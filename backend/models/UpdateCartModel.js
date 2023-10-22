const mongoose = require("mongoose");

const { Schema } = mongoose;

const UpdateCartModel = new Schema({
  userId: {
    type: String,
    required: true,
  },
  cartItems: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("cart_items_masters", UpdateCartModel);
