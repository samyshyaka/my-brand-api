import Joi from 'joi';

const schema = 
   Joi.object({
        name: Joi.string().max(100).required().messages({
            "any.required": "name is required!",
            "string.empty": "name can't be empty!",
            "string.max": "the name is too long"
          }),
        comment: Joi.string().required().messages({
            "any.required": "comment is required!",
            "string.empty": "comment can't be empty!"
          })
    })

export const addCommentValidation = async(req, res, next) => {
    const value = await schema.validate(req.body);
    if(value.error){
        res.status(400).json({
            status:'fail',
            code: '400',
            message: value.error.message
        })
    } else {
        next();
    }
}