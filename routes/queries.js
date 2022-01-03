const express = require("express");
const { addListener } = require("../models/profile");
const router = express.Router()
const Profile = require("../models/profile")

//Get Method

router.get('/', async(req,res) => {
    try {
        const profiles = await Profile.find()
        res.json(profiles)
    }catch(err){
        res.send('Error ' + err)
    }
})

//Get Method - Display one single object

router.get('/:id', async(req,res) => {
    try {
        const profiles = await Profile.findById(req.params.id)
        res.json(profiles)
    }catch(err){
        res.send('Error ' + err)
    }
})



// Delete Method

router.delete("/:id", async(req, res) => {
    try{
        const profile = await Profile.findById(req.params.id);
        const a1 = await profile.remove()
        res.json(a1)
    }catch(err){
        res.send('error ' + err)
    }
})

module.exports = router