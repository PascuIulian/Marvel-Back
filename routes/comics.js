const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/comics", async (req, res) => {
  let filters = "";
  if (req.query.title) {
    filters = filters + "&title=" + req.query.title;
  }
  if (req.query.skip) {
    filters = filters + "&skip=" + req.query.skip;
  }
  if (req.query.limit) {
    filters = filters + "&limit=" + req.query.limit;
  }
  try {
    const comics = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY}` +
        filters
    );
    return res.status(200).json(comics.data);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.get("/comics/:characterId", async (req, res) => {
  try {
    const character = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.characterId}?apiKey=${process.env.API_KEY}`
    );
    return res.status(200).json(character.data);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.get("/comic/:comicId", async (req, res) => {
  try {
    const comic = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comic/${req.params.comicId}?apiKey=${process.env.API_KEY}`
    );
    return res.status(200).json(comic.data);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

module.exports = router;
