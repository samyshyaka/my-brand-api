import express from 'express';
const router = express.Router()
import Query from '../models/query.js';
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



// Delete Method

router.delete("/:id", authenticateToken, async(req, res) => {
    try{
        const profile = await Profile.findById(req.params.id);
        const q1 = await profile.remove()
        res.status(200).json(q1)
    }catch(err){
        res.status(500).send('error ' + err)
    }
})

export default router