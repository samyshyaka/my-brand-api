// import express from "express";
// const app = express();
// app.use(express.json());

import User from '../models/user.js';

const authErrorHandler = async (req, res, next) => {
    const users = await User.find()
    const user = users.find(user => user.name == req.body.name)
    if(user == null){
        return res.status(400).send('Cannot find user')
    }
    next()
}

const usersErrorHandler = async (req, res, next) => {
    const users = await User.find()
    const user = users.find(user => user.name == req.body.name)
    if(user != null){
        return res.status(409).send('User already exists')
    }
    next()
}

export { 
    authErrorHandler,
    usersErrorHandler 
}