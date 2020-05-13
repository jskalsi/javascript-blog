const {check} = require('express-validator');

exports.commentValidator = [
    check('username')
    .trim()
    .escape()
    ,
    check('text')
    .trim()
    .escape()
];

exports.articleValidator = [
    check('title')
    .trim()
    .escape()
    ,
    check('content')
    .trim()
    .escape()
];