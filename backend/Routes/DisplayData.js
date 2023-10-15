const express = require("express");
const router = express.Router();

router.post("/displayData", (req, res) => {
  try {
    res.send(global.foodData);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
