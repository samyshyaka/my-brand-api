import Joi from 'joi';

const schema = 
   Joi.object({
        name: Joi.string().max(100).required().messages({
            "any.required": "name is required!",
            "string.empty": "name can't be empty!",
            "string.max": "the name is too long"
          }),
        email: Joi.string().max(100).required().messages({
            "any.required": "email's name is required!",
            "string.empty": "email's name can't be empty!",
            "string.max": "email's name is too long"
          }),
        message: Joi.string().required().messages({
            "any.required": "message is required!",
            "string.empty": "message can't be empty!"
          })
    })

export const addQueryValidation = async(req, res, next) => {
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