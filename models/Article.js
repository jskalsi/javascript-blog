const mongoose = require("mongoose");

const {CommentSchema} = require('./Comment');

let Schema = mongoose.Schema;

let ArticleSchema = new Schema({
    title:{type:String},
    content:{type:String},
    upvotes:{type:Number},
    comments: [CommentSchema]
});

//convert schema into model.
exports.Article = mongoose.model('Article',ArticleSchema);