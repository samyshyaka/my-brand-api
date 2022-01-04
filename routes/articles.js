const express = require("express");
const { addListener } = require("../models/article");
const router = express.Router()
const Article = require("../models/article")

//Get Method

router.get('/', async(req,res) => {
    try {
        const articles = await Article.find()
        res.status(200).json(articles)
    }catch(err){
        res.status(500).send('Error ' + err)
    }
})

//Get Method - Display one single object

router.get('/:id', async(req,res) => {
    try {
        const articles = await Article.findById(req.params.id)
        res.status(200).json(articles)
    }catch(err){
        res.status(500).send('Error ' + err)
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
        res.status(201).json(a1)
    }catch(err){
        res.status(500).send('error' + err)
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
        res.status(200).json(a1)
    }catch(err){
        res.status(304).send('Error '+ err)
    }
})

// Delete Method

router.delete("/:id", async(req, res) => {
    try{
        const article = await Article.findById(req.params.id);
        const a1 = await article.remove()
        res.status(200).json(a1)
    }catch(err){
        res.status(500).send('error ' + err)
    }
})

module.exports = router