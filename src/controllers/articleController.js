import express from 'express';
import Article from '../models/article.js'

async function getArticleHandler(req,res){
    try {
        const articles = await Article.find()
        res.status(200).json(articles)
    }catch(err){
        res.status(500).send('Error ' + err)
    }
}

async function getSpecificArticleHandler(req,res) {
    try {
        const articles = await Article.findById(req.params.id)
        res.status(200).json(articles)
    }catch(err){
        res.status(500).send('Error ' + err)
    }
}

async function postArticleHandler (req, res) {
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
}

export { getArticleHandler, 
    getSpecificArticleHandler,
    postArticleHandler
    }