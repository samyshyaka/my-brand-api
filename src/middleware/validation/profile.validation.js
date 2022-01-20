import Joi from 'joi';

const schema = 
   Joi.object({
        name: Joi.string().max(100).required().messages({
            "any.required": "name is required!",
            "string.empty": "name can't be empty!",
            "string.max": "the name is too long"
          }),
        whatIDo: Joi.string().max(100).required().messages({
            "any.required": "whatIDo is required!",
            "string.empty": "whatIDo can't be empty!",
            "string.max": "whatIDo is too long"
          }),
        email: Joi.string().required().messages({
            "any.required": "email is required!",
            "string.empty": "email can't be empty!"
          })
    })

export const addProfileValidation = async(req, res, next) => {
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