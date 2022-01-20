import Joi from 'joi';

const schema = 
   Joi.object({
        name: Joi.string().max(100).messages({
            "string.empty": "name can't be empty!",
            "string.max": "the name is too long"
          }),
        comment: Joi.string().messages({
            "string.empty": "comment can't be empty!"
          })
    })

export const addEditCommentValidation = async(req, res, next) => {
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