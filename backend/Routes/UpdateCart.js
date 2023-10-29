const express = require("express");
const router = express.Router();

const cartModel = require("../models/UpdateCartModel");

router.put("/updatecart", async (req, res) => {
  try {
    let userId = req.body.userId;
    let cartItems = req.body.cartItems;
    let cartPrice = req.body.cartPrice;
    let restaurantId = req.body.restaurantId;

    let _hasId = await cartModel.findOne({ userId });
    let resData = {};

    if (_hasId) {
      resData = await cartModel.findOneAndUpdate(
        { userId: userId },
        {
          userId: userId,
          cartItems: cartItems,
          cartPrice: cartPrice,
          restaurantId: restaurantId,
        }
      );
    } else {
      resData = await cartModel.create({
        userId: userId,
        cartItems: cartItems,
        cartPrice: cartPrice,
        restaurantId: restaurantId,
      });
    }

    return res.json({ success: true, message: "Done", data: resData });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "System error" });
  }
});

router.post("/getcart", async (req, res) => {
  try {
    let userId = req.body.userId;

    let _hasId = await cartModel.findOne({ userId });

    if (_hasId) {
      return res.json({ success: true, data: _hasId });
    } else return res.json({ success: false });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "System error" });
  }
});

module.exports = router;
