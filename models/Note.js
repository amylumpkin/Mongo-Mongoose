const mongoose = require("mongoose");

//reference to schema constructor
const Schema = mongoose.Schema;

//create new note schema object
const NoteSchema = new Schema({
    title: String,
    body: String
});

//mongoose model metheod, create model from above schema
const Note = mongoose.model("Note", NoteSchema);

//esport note model
module.export = Note;

