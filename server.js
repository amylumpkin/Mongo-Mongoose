const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

//scraping tools
const axios = require("axios");
const cheerio = require("cheerio");

//require all models
const db = require("./models");

//initialize the port
const PORT = process.env.PORT || 8080;

//initialize express
const app = express();

//middleware
app.use(logger("dev")); //logs results
app.use(bodyParser.urlencoded({ extended: true })); //handles form submissions
app.use(express.static("public")); //makes the public folder the static directory

//connect to mongodb
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.Promis = Promise;
mongoose.connect(MONGODB_URI);

//handlebars



//start server
app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));