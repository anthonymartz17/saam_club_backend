const express = require("express");
const app = express();
const cors = require("cors");

//middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello World!");
});

module.exports = app;
