
import Comment from '../models/comment.js'

const getCommentsHandler = async(req,res) => {
    try {
        const comments = await Comment.find()
        res.status(200).json(comments)
    }catch(err){
        res.status(500).send('Error ' + err)
    }
}

const getSpecificCommentHandler = async(req,res) => {
    try {
        const comment = await Comment.findById(req.params.id)
        if (comment == null) {
            res.status(404).send("Comment not found")
        }
        res.status(200).json(comment)
    }catch(err){
        res.status(500).send('Error ' + err)
    }
}

const postCommentHandler = async(req, res) => {
    const comment = new Comment({
        name: req.body.name,
        comment: req.body.comment
    })

    try{
        const c1 = await comment.save()
        res.status(201).json(c1)
    }catch(err){
        res.status(500).send('error' + err)
    }
}

const putCommentHandler = async(req, res) => {
    try{
        const comment = await Comment.findById(req.params.id);
        if (comment == null) {
            res.status(404).send("Comment not found")
        }
        if(req.body.name){
            comment.name = req.body.name;
        }
        comment.comment = req.body.comment;
        const c1 = await comment.save()
        res.status(200).json(c1)
    }catch(err){
        res.status(304).send('Error '+ err)
    }
}

const deleteCommentHandler = async(req, res) => {
    try{
        const comment = await Comment.findById(req.params.id);
        if (comment == null) {
            res.status(404).send("Comment not found")
        }
        const c1 = await comment.remove()
        res.status(200).send("Comment Deleted")
    }catch(err){
        res.status(500).send('error ' + err)
    }
}

export { getCommentsHandler, 
    getSpecificCommentHandler,
    postCommentHandler,
    putCommentHandler,
    deleteCommentHandler
}