const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create new user schema object
const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

//create model from schema above
const Article = mongoose.model("Article", ArticleSchema);

//export article model
module.exports = Article;