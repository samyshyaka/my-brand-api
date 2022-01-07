import express from 'express';
const router = express.Router()
import Profile from '../models/profile.js';
import { authenticateToken } from './login.js'

//Get Method

router.get('/', authenticateToken, async(req,res) => {
    try {
        const profiles = await Profile.find()
        res.status(200).json(profiles)
    }catch(err){
        res.status(500).send('Error ' + err)
    }
})

//Get Method - Display one single object

router.get('/:id', authenticateToken, async(req,res) => {
    try {
        const profiles = await Profile.findById(req.params.id)
        res.status(200).json(profiles)
    }catch(err){
        res.status(500).send('Error ' + err)
    }
})

//Post Method

router.post('/', authenticateToken, async(req, res) => {
    const profile = new Profile({
        name: req.body.name,
        whatIDo: req.body.whatIDo,
        email: req.body.email
    })

    try{
        const p1 = await profile.save()
        res.status(201).json(p1)
    }catch(err){
        res.status(500).send('error' + err)
    }
})

//Patch Method

router.patch("/:id", authenticateToken, async(req, res)=> {
    try{
        const profile = await Profile.findById(req.params.id);
        profile.name = req.body.name;
        profile.whatIDo = req.body.whatIDo;
        profile.email = req.body.email;
        const p1 = await profile.save()
        res.status(200).json(p1)
    }catch(err){
        res.status(304).send('Error '+ err)
    }
})

// Delete Method

router.delete("/:id", authenticateToken, async(req, res) => {
    try{
        const profile = await Profile.findById(req.params.id);
        const p1 = await profile.remove()
        res.status(200).json(p1)
    }catch(err){
        res.status(500).send('error ' + err)
    }
})

export default router