const express = require("express");
const app = express();
const cors = require("cors");

// Middlewares
app.use(cors());
app.use(express.json());

// Root Route
app.get("/", (req, res) => res.send("Hello World!"));

// Routes
const { likes } = require("./controllers/likes.controller");
app.use("/likes", likes);

module.exports = app;
