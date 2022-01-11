import Profile from '../models/profile.js';

const getProfilesHandler = async(req,res) => {
    try {
        const profiles = await Profile.find()
        res.status(200).json(profiles)
    }catch(err){
        res.status(500).send('Error ' + err)
    }
}

const getSpecificProfilesHandler = async(req,res) => {
    try {
        const profiles = await Profile.findById(req.params.id)
        res.status(200).json(profiles)
    }catch(err){
        res.status(500).send('Error ' + err)
    }
}

const postProfileHandler = async(req, res) => {
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
}

const patchProfileHandler = async(req, res)=> {
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
}

const deleteProfileHandler = async(req, res) => {
    try{
        const profile = await Profile.findById(req.params.id);
        const p1 = await profile.remove()
        res.status(200).json(p1)
    }catch(err){
        res.status(500).send('error ' + err)
    }
}

export { 
    getProfilesHandler,
    getSpecificProfilesHandler,
    postProfileHandler,
    patchProfileHandler,
    deleteProfileHandler
}