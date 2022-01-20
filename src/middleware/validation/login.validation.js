import Joi from 'joi';

const schema = 
   Joi.object({
        email: Joi.string().required().messages({
            "any.required": "email is required!",
            "string.empty": "email can't be empty!"
          }),
        password: Joi.string().required().messages({
            "any.required": "password is required!",
            "string.empty": "password can't be empty!"
          })
    })

export const addLoginValidation = async(req, res, next) => {
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