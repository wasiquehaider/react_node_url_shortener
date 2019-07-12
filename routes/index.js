const express = require("express");
const router = express.Router();

const Url = require("../model/Url");

// @route:              GET /:code
// @description:        Redirect to long or original URL
router.get("/:code", async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });
    if (url) {
      return res.redirect(url.longUrl);
    } else {
      res.status(404).json("No Url Found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
