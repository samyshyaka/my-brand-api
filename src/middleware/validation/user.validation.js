import Joi from 'joi';
import pkg from 'joi-password-complexity';
const  passwordComplexity  = pkg;

const complexityOptions = {
    min: 8,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
  };

const schema = 
   Joi.object({
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } }).required().messages({
            "any.required": "email is required!",
            "string.empty": "email can't be empty!",
            "string.email": "invalid email!",
          }),
        password: passwordComplexity(complexityOptions).required().messages({
            "any.required": "password is required!",
            "string.empty": "password can't be empty!",
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