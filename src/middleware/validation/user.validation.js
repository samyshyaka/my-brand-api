import Joi from 'joi';

const schema = 
   Joi.object({
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } }).required().messages({
            "any.required": "email is required!",
            "string.empty": "email can't be empty!",
            "string.email": "invalid email!",
          }),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required().messages({
            "any.required": "password is required!",
            "string.empty": "password can't be empty!",
            'string.pattern.base': "password does not meet the requirements",
          }),
    })

export const addUserValidation = async(req, res, next) => {
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