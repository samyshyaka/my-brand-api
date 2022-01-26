import dotenv from 'dotenv';
dotenv.config();

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

const postAuthHandler = async (req, res) => {
    const users = await User.find()
    const user = users.find(user => user.email == req.body.email)
    try{
        if (await bcrypt.compare(req.body.password, user.password)){
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h'});
            res
            .status(200)
            .send({
                status : "success",
                code: 200,
                accessToken : accessToken
            })
            
        } else {
            res.status(401).send({
                status : "fail",
                code: 401,
                message : "Wrong email or password"
            })
        }
    }
    catch(err){
        res.status(500).send({
            status : "fail",
            code: 500,
            message : "Unable to connect to the database"
        })
    }
}

export { postAuthHandler }