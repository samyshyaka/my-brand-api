import Joi from 'joi';

const schema = 
   Joi.object({
        title: Joi.string().max(300).required(),
        author: Joi.string().max(200).required(),
        content: Joi.string().required()
    })

export const addArticleValidation = async(req, res, next) => {
    const value = await schema.validate(req.body);
    if(value.error){
        res.status(400).json({
            status:'fail',
            code: '400',
            message: value.error.details[0].message
        })
    } else {
        next();
    }
}