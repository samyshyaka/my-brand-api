import Joi from 'joi';

const schema = 
   Joi.object({
        name: Joi.string().max(100).messages({
            "string.empty": "name can't be empty!",
            "string.max": "the name is too long"
          }),
        whatIDo: Joi.string().max(100).messages({
            "string.empty": "whatIDo can't be empty!",
            "string.max": "profession (whatIDo) name is too long"
          }),
        email: Joi.string().messages({
            "string.empty": "email can't be empty!"
          })
    })

export const addEditProfileValidation = async(req, res, next) => {
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