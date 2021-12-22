const express = require("express");
const { addListener } = require("../models/article");
const router = express.Router()
const Article = require("../models/article")

//Get Method

router.get('/', async(req,res) => {
    try {
        const articles = await Article.find()
        res.json(articles)
    }catch(err){
        res.send('Error ' + err)
    }
})

//Get Method - Display one single object

router.get('/:id', async(req,res) => {
    try {
        const articles = await Article.findById(req.params.id)
        res.json(articles)
    }catch(err){
        res.send('Error ' + err)
    }
})

//Post Method

router.post('/', async(req, res) => {
    const article = new Article({
        title: req.body.title,
        author: req.body.author,
        content: req.body.content
    })

    try{
        const a1 = await article.save()
        res.json(a1)
    }catch(err){
        res.send('error' + err)
    }
})

//Patch Method

router.patch("/:id", async(req, res)=> {
    try{
        const article = await Article.findById(req.params.id);
        article.title = req.body.title;
        article.author = req.body.author;
        article.content = req.body.content;
        const a1 = await article.save()
        res.json(a1)
    }catch(err){
        res.send('Error '+ err)
    }
})

// Delete Method

router.delete("/:id", async(req, res) => {
    try{
        const article = await Article.findById(req.params.id);
        const a1 = await article.remove()
        res.json(a1)
    }catch(err){
        res.send('error ' + err)
    }
})

module.exports = router