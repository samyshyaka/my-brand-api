import bcrypt from 'bcrypt';

import User from '../models/user.js';

const postUserHandler = async (req, res) => {

    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const newUser = new User({
        email: req.body.email,
        password: hashedPassword
    })

    try{
    const u1 = await newUser.save()
    res.status(201).send({
        status : "success",
        code: 201,
        data : {
            "user" : {
                "id":u1._id,
                "email":u1.email
            }
         }
    })
    }

    catch(err) {
    res.status(500).send({
        status : "error",
        code: 500,
        message : "unable to cummunicate with the database"
    })
    }

}

export {
    postUserHandler
}