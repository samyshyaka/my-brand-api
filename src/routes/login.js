import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const router = express.Router()
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import User from '../models/user.js'


router.post('/', async (req, res) => {
    const users = await User.find()
    const user = users.find(user => user.name === req.body.name)
    if(user == null){
        return res.status(400).send('Cannot find user')
    }
    try{
        if (await bcrypt.compare(req.body.password, user.password)){
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h'});
            res.status(200).json({ accessToken: accessToken });
        } else {
            res.status(401).send('Not allowed')
        }
    }
    catch(err){
        res.status(500).send(''+err)
    }
})

export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(401)
        req.user = user
        next()
    })
}



export default router