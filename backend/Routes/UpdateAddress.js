const express = require("express");
const router = express.Router();

const cartModel = require("../models/UpdateAddressModel");

router.put("/updateaddress", async (req, res) => {
  try {
    let userId = req.body.userId;
    let latitude = req.body.latitude;
    let longitude = req.body.longitude;
    let country = req.body.country;
    let state = req.body.state;
    let city = req.body.city;
    let pin = req.body.pin;
    let street = req.body.street;

    let _hasId = await cartModel.findOne({ userId });
    let resData = {};

    if (_hasId) {
      resData = await cartModel.findOneAndUpdate(
        { userId: userId },
        {
          userId: userId,
          latitude: latitude,
          longitude: longitude,
          country: country,
          state: state,
          city: city,
          pin: pin,
          street: street,
        }
      );
    } else {
      resData = await cartModel.create({
        userId: userId,
        latitude: latitude,
        longitude: longitude,
        country: country,
        state: state,
        city: city,
        pin: pin,
        street: street,
      });
    }

    if (resData) {
      try {
        let _hasId = await cartModel.findOne({ userId });

        if (_hasId) {
          return res.json({ success: true, data: _hasId });
        } else return res.json({ success: false });
      } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "System error" });
      }
    }

    return res.json({ success: true, message: "Done", data: resData });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "System error" });
  }
});

module.exports = router;
