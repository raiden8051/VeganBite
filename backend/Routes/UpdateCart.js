const express = require("express");
const router = express.Router();

const cartModel = require("../models/UpdateCartModel");

router.put("/updatecart", async (req, res) => {
  try {
    let userId = req.body.userId;
    let cartItems = req.body.cartItems;

    let _hasId = await cartModel.findOne({ userId });

    if (_hasId) {
      await cartModel.findOneAndUpdate(
        { userId: userId },
        {
          userId: userId,
          cartItems: cartItems,
        }
      );
    } else {
      await cartModel.create({
        userId: userId,
        cartItems: cartItems,
      });
    }

    return res.json({ success: true, message: "Done" });
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
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "System error" });
  }
});

module.exports = router;
