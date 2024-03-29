const express = require("express");
const router = express.Router();
const validUrl = require("valid-url");
const shortid = require("shortid");
const config = require("config");

const Url = require("../model/Url");

// @route: POST /api/url/shorten
// @description create short URL

router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = config.get("baseUrl");

  //   check base url
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json("Invalid Base Url");
  }

  //create URL Code

  const urlCode = shortid.generate();

  //   check long url
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl: longUrl });

      if (url) {
        res.json(url);
      } else {
        const shortUrl = baseUrl + "/" + urlCode;

        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date()
        });

        await url.save();
        res.json(url);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json("Server Error");
    }
  } else {
    return res.status(401).json("Invalid Long Url");
  }
});

module.exports = router;
