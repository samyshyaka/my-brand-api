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

//Post Method

router.post('/', async(req, res) => {
    const profile = new Profile({
        name: req.body.name,
        whatIDo: req.body.whatIDo,
        email: req.body.email
    })

    try{
        const a1 = await profile.save()
        res.json(a1)
    }catch(err){
        res.send('error' + err)
    }
})

//Patch Method

router.patch("/:id", async(req, res)=> {
    try{
        const profile = await Profile.findById(req.params.id);
        profile.name = req.body.name;
        profile.whatIDo = req.body.whatIDo;
        profile.email = req.body.email;
        const a1 = await profile.save()
        res.json(a1)
    }catch(err){
        res.send('Error '+ err)
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