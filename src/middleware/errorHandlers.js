// import express from "express";
// const app = express();
// app.use(express.json());

import User from '../models/user.js';
import Article from '../models/article.js'

const authErrorHandler = async (req, res, next) => {
    const users = await User.find()
    const user = users.find(user => user.email == req.body.email)
    if(user == null){
        return res.status(404).send({
            status : "fail",
            code: 404,
            message : "User not found"
        })
    }
    next()
}

const usersErrorHandler = async (req, res, next) => {
    const users = await User.find()
    const user = users.find(user => user.email == req.body.email)
    if(user != null){
        return res.status(409).send({
            status : "fail",
            code: 409,
            message : "This email is associated with an existing account"
        })
    }
    next()
}

const articlesErrorHandler = async (req, res, next) => {
    const articles = await Article.find()
    const article = articles.find(article => article.title == req.body.title)
    if(article != null){
        return res.status(409).send({
            status : "fail",
            code: 409,
            message : "Title taken, please find a different title"
        })
    }
    next()
}

export { 
    authErrorHandler,
    usersErrorHandler,
    articlesErrorHandler 
}