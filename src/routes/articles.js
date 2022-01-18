import express from 'express';
import { authenticateToken } from '../middleware/verifyJWT.js'
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

router.post('/', authenticateToken, postArticleHandler)

router.put("/:id", authenticateToken, putArticleHandler)

router.delete("/:id", authenticateToken, deleteArticleHandler)

export default router;