import express from 'express';
import { authenticateToken } from '../middleware/verifyJWT.js'
import { addArticleValidation } from '../middleware/validation/article.validation.js';
import { addEditArticleValidation } from '../middleware/validation/editArticle.validation.js';
import { articlesErrorHandler } from '../middleware/errorHandlers.js'; 
import { addCommentValidation } from '../middleware/validation/comment.validation.js';
import { postCommentHandler } from '../controllers/commentController.js'
import { 
    getArticlesHandler, 
    getSpecificArticleHandler,
    postArticleHandler,
    putArticleHandler,
    deleteArticleHandler 
    } from '../controllers/articleController.js'

const router = express.Router()

router.get('/', getArticlesHandler)

router.get('/:id', getSpecificArticleHandler)

router.post('/', addArticleValidation, authenticateToken, articlesErrorHandler, postArticleHandler)

router.put('/:id', addEditArticleValidation, authenticateToken, putArticleHandler)

router.delete('/:id', authenticateToken, deleteArticleHandler)

router.post('/:id/comments', addCommentValidation, authenticateToken, postCommentHandler)

export default router;