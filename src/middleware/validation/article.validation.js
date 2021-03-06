import Joi from 'joi';

const schema = 
   Joi.object({
        title: Joi.string().max(100).required().messages({
            "any.required": "title is required!",
            "string.empty": "title can't be empty!",
            "string.max": "the title is too long"
          }),
        author: Joi.string().max(100).required().messages({
            "any.required": "author's name is required!",
            "string.empty": "author's name can't be empty!",
            "string.max": "author's name is too long"
          }),
        content: Joi.string().required().messages({
            "any.required": "content is required!",
            "string.empty": "content can't be empty!"
          })
    })

export const addArticleValidation = async(req, res, next) => {
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