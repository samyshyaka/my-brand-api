import dotenv from 'dotenv';
dotenv.config();

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

const postAuthHandler = async (req, res) => {
    const users = await User.find()
    const user = users.find(user => user.name == req.body.name)
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
}

export { postAuthHandler }