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
    const newUser = new User({
        email: req.body.email,
        password: hashedPassword
    })

    try{
    const u1 = await newUser.save()
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