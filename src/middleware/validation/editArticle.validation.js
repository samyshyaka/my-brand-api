import Joi from 'joi';

const schema = 
   Joi.object({
        title: Joi.string().max(100).messages({
            "string.empty": "title can't be empty!",
            "string.max": "the title is too long"
          }),
        author: Joi.string().max(100).messages({
            "string.empty": "author's name can't be empty!",
            "string.max": "author's name is too long"
          }),
        content: Joi.string().messages({
            "string.empty": "content can't be empty!"
          })
    })

export const addEditArticleValidation = async(req, res, next) => {
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