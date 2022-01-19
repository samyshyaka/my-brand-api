import express from 'express';
import { authenticateToken } from '../middleware/verifyJWT.js'
import { addArticleValidation } from '../middleware/validation/article.validation.js';
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

router.post('/', addArticleValidation, authenticateToken, postArticleHandler)

router.put("/:id", addArticleValidation, authenticateToken, putArticleHandler)

router.delete("/:id", authenticateToken, deleteArticleHandler)

export default router;