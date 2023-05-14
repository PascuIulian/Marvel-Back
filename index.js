const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

app.get("/", (req, res) => {
  try {
    return res.status(200).json("Welcome to my Marvel Server");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

const comicsRoutes = require("./routes/comics");
app.use(comicsRoutes);

const charactersRoutes = require("./routes/characters");
app.use(charactersRoutes);

const userRoutes = require("./routes/user");
app.use(userRoutes);

app.all("*", (req, res) => {
  try {
    return res.status(404).json({ message: "Not found" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log("MARVEL Server started 🔫");
});
