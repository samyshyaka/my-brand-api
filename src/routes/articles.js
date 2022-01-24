import express from 'express';
import { authenticateToken } from '../middleware/verifyJWT.js'
import { addArticleValidation } from '../middleware/validation/article.validation.js';
import { addEditArticleValidation } from '../middleware/validation/editArticle.validation.js';
import { articlesErrorHandler } from '../middleware/errorHandlers.js'; 
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

router.put("/:id", addEditArticleValidation, authenticateToken, putArticleHandler)

router.delete("/:id", authenticateToken, deleteArticleHandler)

export default router;