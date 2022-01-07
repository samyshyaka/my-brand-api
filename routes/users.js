import express from 'express';
const router = express.Router();
import bcrypt from 'bcrypt';
import User from '../models/user.js';


router.get('/', async(req,res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    }catch(err){
        res.status(500).send('Error ' + err)
    }
})

router.post('/', async (req, res) => {

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

})

export default router