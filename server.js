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
app.use(bodyParser.urlencoded({ extended: true})); //handles form submissions
app.use(express.static("public")); //makes the public folder the static directory

//connect to mongodb
mongoose.connect("mongodb://localhost/Mongo-Mongoose");

//routes
