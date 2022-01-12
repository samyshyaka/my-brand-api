
import Article from '../models/article.js'

const getArticlesHandler = async(req,res) => {
    try {
        const articles = await Article.find()
        res.status(200).json(articles)
    }catch(err){
        res.status(500).send('Error ' + err)
    }
}

const getSpecificArticleHandler = async(req,res) => {
    try {
        const article = await Article.findById(req.params.id)
        if (article == null) {
            return res.status(404).send("Article not found")
        }
        res.status(200).json(article)
    }catch(err){
        res.status(500).send('Error ' + err)
    }
}

const postArticleHandler = async(req, res) => {
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

const patchArticleHandler = async(req, res) => {
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
}

const deleteArticleHandler = async(req, res) => {
    try{
        const article = await Article.findById(req.params.id);
        const a1 = await article.remove()
        res.status(200).send("Article Deleted")
    }catch(err){
        res.status(500).send('error ' + err)
    }
}

export { getArticlesHandler, 
    getSpecificArticleHandler,
    postArticleHandler,
    patchArticleHandler,
    deleteArticleHandler
}