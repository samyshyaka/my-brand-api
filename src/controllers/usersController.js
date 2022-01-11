import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.js';

const getUsersHandler = async(req,res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    }catch(err){
        res.status(500).send('Error ' + err)
    }
}

const postUserHandler = async (req, res) => {

    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = new User({
        name: req.body.name,
        password: hashedPassword
    })
try{       

    const u1 = await user.save()
    res.status(201).send(u1)
}

catch(err) {
    res.status(500).send(''+err)
}

}

export { 
    getUsersHandler,
    postUserHandler
}