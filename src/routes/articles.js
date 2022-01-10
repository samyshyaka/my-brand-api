import express from 'express';
const router = express.Router()
import Article from '../models/article.js'
import { authenticateToken } from './login.js'

//Get Method

router.get('/', authenticateToken, async(req,res) => {
    try {
        const articles = await Article.find()
        res.status(200).json(articles)
    }catch(err){
        res.status(500).send('Error ' + err)
    }
})

//Get Method - Display one single object

router.get('/:id', authenticateToken, async(req,res) => {
    try {
        const articles = await Article.findById(req.params.id)
        res.status(200).json(articles)
    }catch(err){
        res.status(500).send('Error ' + err)
    }
})

//Post Method

router.post('/', authenticateToken, async(req, res) => {
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

router.patch("/:id", authenticateToken, async(req, res)=> {
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

router.delete("/:id", authenticateToken, async(req, res) => {
    try{
        const article = await Article.findById(req.params.id);
        const a1 = await article.remove()
        res.status(200).json(a1)
    }catch(err){
        res.status(500).send('error ' + err)
    }
})

export default router;