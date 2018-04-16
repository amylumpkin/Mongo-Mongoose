const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create new user schema object
const ArticleSchema = new Schema({
    title: {
        type: String,
        required: false
    },
    link: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
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