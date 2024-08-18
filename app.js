const express = require("express");
const app = express();
const cors = require("cors");
const commentsController = require("./controllers/comments.controller");

//middlewares
app.use(cors());
app.use(express.json());
app.use("/comments", commentsController);

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.get("*", (req, res) => {
	res.status(404).send("Page not found");
});
module.exports = app;
