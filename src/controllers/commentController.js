import Comment from '../../comment.js'
import Article from '../models/article.js'

const getCommentsHandler = async(req,res) => {
    try {
        const comments = await Comment.find()
        res.status(200).json({
            status : "success",
            code: 200,
            data : {
                "comments" : comments
             }
        }).end();
    }catch(err){
        res.status(500).send('Error ' + err)
    }
}

const getSpecificCommentHandler = async(req,res) => {
    try {
        const comment = await Comment.findById(req.params.id)
        if (!comment) {
            return res.status(404).send({
                status : "fail",
                code: 404,
                message : "comment not found"
            })
        }
        return res.status(200).json({
            status : "success",
            code: 200,
            data : {
                "comment" : comment
             }
        }).end();
    }catch(err){
        return res.status(500).send({
            status : "error",
            code: 500,
            message : "unable to communicate with the database"
        })
    }
}

const postCommentHandler = async(req, res) => {
    const id = req.params.id;
    const comment = new Comment({
        name: req.body.name,
        comment: req.body.comment,
        article: id
    })

    try{
        const c1 = await comment.save()
        const relatedArticle = await Article.findById(id);
        relatedArticle.comments.push(comment)
        await relatedArticle.save((err) => {
            if(err){
                console.log(err)
            }
        })
        res.status(201).json({
            status : "success",
            code: 201,
            data : {
                "comment" : c1
             }
        })
    }catch(err){
        res.status(500).send({
            status : "error",
            code: 500,
            message : err
        })
    }
}

const putCommentHandler = async(req, res) => {
    try{
        const comment = await Comment.findById(req.params.id);
        if (comment == null) {
            res.status(404).send({
                status : "fail",
                code: 404,
                message : "comment not found"
            })
        }
        if(req.body.name){
            comment.name = req.body.name;
        }
        comment.comment = req.body.comment;
        const c1 = await comment.save()
        res.status(200).json({
            status : "success",
            code: 200,
            data : {
                "comment" : c1
             }
        })
    }catch(err){
        res.status(304).send({
            status : "error",
            code: 304,
            message : "comment not modified"
        })
    }
}

const deleteCommentHandler = async(req, res) => {
    try{
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).send({
                status : "fail",
                code: 404,
                message : "comment not found"
            })
        }
        const c1 = await comment.remove()
        return res.status(200).send({
            status : "success",
            code: 200,
            message : "comment deleted"
        })
    }catch(err){
        return res.status(500).send({
            status : "error",
            code: 500,
            message : err
        })
    }
}

export { getCommentsHandler, 
    getSpecificCommentHandler,
    postCommentHandler,
    putCommentHandler,
    deleteCommentHandler
}