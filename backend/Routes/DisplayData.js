const express = require("express");
const router = express.Router();

router.post("/displaydata", (req, res) => {
  try {
    res.send(global.foodData);
  } catch (err) {
    console.log(err);
  }
});

router.post("/displaydatacategory", (req, res) => {
  try {
    res.send(global.foodDataCategory);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
