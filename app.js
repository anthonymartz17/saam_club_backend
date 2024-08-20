const express = require("express");
const cors = require("cors");
const commentsController = require("./controllers/comments.controller");
const postsController = require("./controllers/posts.controller");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/comments", commentsController);

// Root Route
app.get("/", (req, res) => res.send("Hello World!"));

// Routes
const { likes } = require("./controllers/likes.controller");
app.use("/likes", likes);
app.use("/posts", postsController);


app.get("*", (req, res) => {
	res.status(404).send("Page not found");
});
module.exports = app;
