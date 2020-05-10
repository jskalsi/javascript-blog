const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let CommentSchema = new Schema({
    username:{type:String},
    text:{type:String}
});
exports.CommentSchema = CommentSchema;

exports.Comment = mongoose.model('Comment',CommentSchema);