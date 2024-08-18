const express = require("express");
const app = express();
const cors = require("cors");
const postsController = require("./controllers/posts.controller.js")

//middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello World!");
});
app.use("/posts", postsController);

module.exports = app;
