const express = require("express");
const { addListener } = require("../models/profile");
const router = express.Router()
const Profile = require("../models/profile")

//Get Method

router.get('/', async(req,res) => {
    try {
        const profiles = await Profile.find()
        res.status(200).json(profiles)
    }catch(err){
        res.status(500).send('Error ' + err)
    }
})

//Get Method - Display one single object

router.get('/:id', async(req,res) => {
    try {
        const profiles = await Profile.findById(req.params.id)
        res.status(200).json(profiles)
    }catch(err){
        res.status(500).send('Error ' + err)
    }
})



// Delete Method

router.delete("/:id", async(req, res) => {
    try{
        const profile = await Profile.findById(req.params.id);
        const a1 = await profile.remove()
        res.status(200).json(a1)
    }catch(err){
        res.status(500).send('error ' + err)
    }
})

module.exports = router