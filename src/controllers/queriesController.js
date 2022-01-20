import Query from '../models/query.js';

const getQueryHandler = async(req,res) => {
    try {
        const queries = await Query.find()
        res.status(200).json({
            status : "success",
            code: 200,
            data : {
                "queries" : queries
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

const getSpecificQueryHandler = async(req,res) => {
    try {
        const query = await Query.findById(req.params.id)
        if (query == null) {
            res.status(404).send({
                status : "fail",
                code: 404,
                message : "query not found"
            })
        }
        res.status(200).json({
            status : "success",
            code: 200,
            data : {
                "query" : query
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

const postQueryHandler = async(req, res) => {
    const query = new Query({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    })

    try{
        const q1 = await query.save()
        res.status(201).json({
            status : "success",
            code: 201,
            data : {
                "query" : q1
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

const deleteQuerry = async(req, res) => {
    try{
        const query = await Query.findById(req.params.id);
        if (query == null) {
            res.status(404).send({
                status : "fail",
                code: 404,
                message : "Query not found"
            })
        }
        const q1 = await query.remove()
        res.status(200).json({
            status : "success",
            code: 200,
            message : "Query deleted"
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
    getQueryHandler,
    getSpecificQueryHandler,
    postQueryHandler,
    deleteQuerry
}