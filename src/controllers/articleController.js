import Article from '../models/article.js'

const getArticlesHandler = async(req,res) => {
    try {
        const articles = await Article.find()
        res.status(200).json(
            {
                status : "success",
                code: 200,
                data : {
                    "articles" : articles
                 }
            }
        )
    }catch(err){
        res.status(500).send({
            status : "error",
            code: 500,
            message : "unable to communicate with the database"
        })
    }
}

const getSpecificArticleHandler = async(req,res) => {
    try {
        const article = await Article.findById(req.params.id)
        if (article == null) {
            res.status(404).send({
                status : "fail",
                code: 404,
                message : "article not found"
            })
        }
        res.status(200).json({
            status : "success",
            code: 200,
            data : {
                "article" : article
             }
        })
    }catch(err){
        res.status(500).send({
            status : "error",
            code: 500,
            message : "unable to communicate with the database"
        })
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
        res.status(201).json({
            status : "success",
            code: 201,
            data : {
                "article" : a1
             }
        })
    }catch(err){
        res.status(500).send({
            status : "error",
            code: 500,
            message : "unable to communicate with the database"
        })
    }
}

const putArticleHandler = async(req, res) => {
    try{
        const article = await Article.findById(req.params.id);
        if (article == null) {
            res.status(404).send({
                status : "fail",
                code: 404,
                message : "article not found"
            })
        }
        if(req.body.title){
            article.title = req.body.title;
        } else if (req.body.author){
            article.author = req.body.author;
        }        
        article.content = req.body.content;
        const a1 = await article.save()
        res.status(200).json({
            status : "success",
            code: 200,
            data : {
                "article" : a1
             }
        })
    }catch(err){
        res.status(304).send({
            status : "error",
            code: 304,
            message : "Not modified"
        })
    }
}

const deleteArticleHandler = async(req, res) => {
    try{
        const article = await Article.findById(req.params.id);
        if (article == null) {
            res.status(404).send({
                status : "fail",
                code: 404,
                message : "Article not found"
            })
        }
        const a1 = await article.remove()
        res.status(200).send({
            status : "success",
            code: 200,
            message : "Article deleted"
        })
    }catch(err){
        res.status(500).send({
            status : "error",
            code: 500,
            message : "unable to communicate with the database"
        })
    }
}

export { getArticlesHandler, 
    getSpecificArticleHandler,
    postArticleHandler,
    putArticleHandler,
    deleteArticleHandler
}