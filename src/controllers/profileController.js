import Profile from '../models/profile.js';

const getProfilesHandler = async(req,res) => {
    try {
        const profiles = await Profile.find()
        res.status(200).json({
            status : "success",
            code: 200,
            data : {
                "profiles" : profiles
             }
        })
    }catch(err){
        res.status(500).send({
            status : "error",
            code: 500,
            message : "unable to communicate with the database"
    })
    }
}

const getSpecificProfilesHandler = async(req,res) => {
    try {
        const profile = await Profile.findById(req.params.id)
        if (profile == null) {
            res.status(404).send({
                status : "fail",
                code: 404,
                message : "profile not found"
            })
        }
        res.status(200).json({
            status : "success",
            code: 200,
            data : {
                "profile" : profile
             }
        })
    }catch(err){
        res.status(500).send({
            status : "error",
            code: 500,
            message : "unable to communicate with the database"
        })
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
        res.status(201).json({
            status : "success",
            code: 201,
            data : {
                "profile" : p1
             }
        })
    }catch(err){
        res.status(500).send({
            status : "error",
            code: 500,
            message : "unable to communicate with the database"
        })
    }
}

const putProfileHandler = async (req, res)=> {
    try{
        const profile = await Profile.findById(req.params.id);
        if (profile == null) {
            res.status(404).send({
                status : "fail",
                code: 404,
                message : "Profile not found"
            })
        }
        if(req.body.name){
            profile.name = req.body.name;
        } else if(req.body.whatIDo){
            profile.whatIDo = req.body.whatIDo;
        }
        profile.email = req.body.email;
        const p1 = await profile.save()
        res.status(200).json({
            status : "success",
            code: 200,
            data : {
                "profile" : p1
             }
        })
    }catch(err){
        res.status(304).send({
            status : "error",
            code: 304,
            message : "Not modified"
        })
    }
}

const deleteProfileHandler = async(req, res) => {
    try{
        const profile = await Profile.findById(req.params.id);
        if (profile == null) {
            res.status(404).send({
                status : "fail",
                code: 404,
                message : "Profile not found"
            })
        }
        const p1 = await profile.remove()
        res.status(200).send({
            status : "success",
            code: 200,
            message : "Profile deleted"
        })
    }catch(err){
        res.status(500).send({
            status : "error",
            code: 500,
            message : "unable to communicate with the database"
        })
    }
}

export { 
    getProfilesHandler,
    getSpecificProfilesHandler,
    postProfileHandler,
    putProfileHandler,
    deleteProfileHandler
}