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
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

//handlebars

//routes

//get route to scrape website
app.get("/scrape", function(req, res) {
    axios.get("http://www.newsandguts.com").then(function(response) { //grabs html body
        const $ = cheerio.load(response.data);  //load into cheerio in a usable format.
        $("div.postTile-wrap").each(function(i, element) {
            console.log("cheerio is finding this div");
            const result = {};

            //specific html tags within the body above
            result.title = $(this)
            .children("div.postTile-col--2")
            .children("div.postTile-meta")
            .text();
            console.log("grabbed" + result.title);
            result.link = $(this)
            .children("h1.postTile-title")
            .text();
            console.log("grabbed" + result.link);
            result.image = $(this)
            .children("div.postTile-col--1")
            .children("picture")
            .children("img")
            .attr("src");
            console.log("grabbed" + result.image);

            //create new article using above result object
            db.Article.create(result)
            .then(function(dbArticle) {
                console.log(dbArticle);
            })
            .catch(function(err) {
                //return res.json(err);
                console.log(err);
            });
        });

        //message sent to user if successfully scraped
        res.send("Scrape Complete");
    });
});

//route for getting all articles from db
app.get("/articles", function(req, res) {
    db.Article.find({})
    .then(function(err) {
        res.json(err);
    });
});

//route for getting specific article & populate with its note
app.get("/articles/:id", function(req, res) {
    db.Article.findOne({ _id: req.params.id })
    .populate("note")
    .then(function(dbArticle) {
        res.json(dbArticle);
    })
    .catch(function(err) {
        res.json(err);
    });
});

//route for saving & updating notes
app.post("/articles/:id", function(req, res) {
    db.Note.create(req.body)
    .then(function(dbNote) {
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
    .then(function(dbArticle) {
        res.json(dbArticle);
    })
    .catch(function(err) {
        res.json(err);
    });
});




//start server
app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));