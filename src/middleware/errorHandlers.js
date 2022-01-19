// import express from "express";
// const app = express();
// app.use(express.json());

import User from '../models/user.js';

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
            message : "User already exists"
        })
    }
    next()
}

export { 
    authErrorHandler,
    usersErrorHandler 
}