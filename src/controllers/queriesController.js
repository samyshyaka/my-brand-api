import Query from '../models/query.js';

const getQueryHandler = async(req,res) => {
    try {
        const profiles = await Query.find()
        res.status(200).json(profiles)
    }catch(err){
        res.status(500).send('Error ' + err)
    }
}

const getSpecificQueryHandler = async(req,res) => {
    try {
        const profiles = await Query.findById(req.params.id)
        res.status(200).json(profiles)
    }catch(err){
        res.status(500).send('Error ' + err)
    }
}

const deleteQuerry = async(req, res) => {
    try{
        const profile = await Query.findById(req.params.id);
        const q1 = await profile.remove()
        res.status(200).json(q1)
    }catch(err){
        res.status(500).send('error ' + err)
    }
}

export { 
    getQueryHandler,
    getSpecificQueryHandler,
    deleteQuerry
}