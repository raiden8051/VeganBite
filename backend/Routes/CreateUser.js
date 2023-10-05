const express = require("express");
const router = express.Router();

const User = require("../models/User");
const { body, validationResult } = require("express-validator");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecretKey =
  "IxV075P9rXK0BD5RRNjpOJsSCt+uRjnr1vK3HnGsU268BC4qwcyM3/wzrWYNUZ3X";

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

    const salt = await bcrypt.genSalt(10);
    let securePassword = await bcrypt.hash(req.body.password, salt);

    try {
      let email = req.body.email;
      let userData = await User.findOne({ email });

      if (!userData) {
        await User.create({
          name: req.body.name,
          location: req.body.location,
          password: securePassword,
          email: req.body.email,
        });

        return res.json({ success: true, message: "Done" });
      } else {
        return res.json({ success: false, message: "Email already exists" });
      }
    } catch (error) {
      return res.json({ success: false, message: "System error" });
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
        let pwdCompare = await bcrypt.compare(
          req.body.password,
          userData.password
        );
        if (pwdCompare) {
          let data = {
            user: {
              id: userData.id,
            },
          };
          let authToken = jwt.sign(data, jwtSecretKey);
          return res.json({ success: true, authToken: authToken });
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
