const express = require("express");
const router = express.Router();

const User = require("../models/User");
const { body, validationResult } = require("express-validator");

router.post(
  "/createuser",
  [
    body("name", "Enter valid name").isLength({ min: 5 }),
    body("password", "Enter valid password").isLength({ min: 5 }),
    body("email", "Enter valid email").isEmail(),
  ],
  async (req, res) => {
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
      return res.status(400).json({ errors: validationError.array() });
    }

    try {
      await User.create({
        name: req.body.name,
        location: req.body.location,
        password: req.body.password,
        email: req.body.email,
      });

      return res.json({ success: true });
    } catch (error) {
      console.log(error);
      return res.json({ success: false });
    }
  }
);

router.post(
  "/login",
  [
    body("password", "Enter valid password").isLength({ min: 5 }),
    body("email", "Enter valid email").isEmail(),
  ],
  async (req, res) => {
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
      return res.status(400).json({ errors: validationError.array() });
    }

    let email = req.body.email;
    try {
      let userData = await User.findOne({ email });

      if (!userData) {
        return res.status(400).json({ errors: validationError.array() });
      } else {
        if (req.body.password === userData.password) {
          return res.json({ success: true });
        } else {
          return res.json({ success: false });
        }
      }
    } catch (error) {
      console.log(error);
      return res.json({ success: error });
    }
  }
);

module.exports = router;
