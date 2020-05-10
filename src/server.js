import express, { response } from 'express';
import bodyParser from 'body-parser';
import {Article} from '../models/Article';
import path from 'path';

const app = express();
app.use(express.static(path.join(__dirname, '/build')));
app.use(bodyParser.json());
const connection = require('../db/connection');

var port = process.env.PORT || 8080;

//To enable CORS for all resources
//https://dzone.com/articles/cors-in-node
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/api/articles', (req, res) => {
    Article.find()
    .then(results=>{
        res.status(201).send(results);
    })
    .catch(error=>res.status(500).send(error))
});

app.get('/api/article/:id', (req, res) => {
    Article.findOne({_id:req.params.id})
    .then(results=>{
        res.status(201).send(results);
    })
    .catch(error=>res.status(500).send(error))
});

app.post('/api/article/:id/upvote', (req, res) => {
    Article.findOne({_id:req.params.id})
    .then(results=>{
        results.upvotes=results.upvotes+1;
        results.save();
        res.status(200).send(results);
    })
    .catch(error=>res.status(500).send(error))
})

app.post('/api/article/:id/add-comment', (req,res) => {
    const {username, text} = req.body;

    Article.findOne({_id:req.params.id})
    .then(results=>{
        results.comments.push({username, text});
        results.save();
        res.status(200).send(results);
    })
    .catch(error=>res.status(500).send(error))
})

app.post('/api/article/create', (req,res) => {
    let article = new Article(req.body);

    article.save()
    .then(()=>{
        res.status(200).send(article);
    })
    .catch(error=>res.status(500).send(error));
})

app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname+'/build/index.html'))
})

connection.once('open', ()=>{
    console.log('connected to db');
        app.listen(port, ()=>{
            console.log(`listening on ${port}`);
    });
});