import express from 'express';
import Article from '../models/article.js'
import { authenticateToken } from './login.js'
import { 
    getArticleHandler, 
    getSpecificArticleHandler,
    postArticleHandler 
    } from '../controllers/articleController.js'

const router = express.Router()

//Get Method

router.get('/', authenticateToken, getArticleHandler)

//Get Method - Display one single object

router.get('/:id', authenticateToken, getSpecificArticleHandler)

//Post Method

router.post('/', authenticateToken, postArticleHandler)

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