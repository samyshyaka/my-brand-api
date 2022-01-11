import express from 'express';
import { authenticateToken } from '../middleware/verifyJWT.js'
import { 
    getArticlesHandler, 
    getSpecificArticleHandler,
    postArticleHandler,
    patchArticleHandler,
    deleteArticleHandler 
    } from '../controllers/articleController.js'

const router = express.Router()

//Get Method

router.get('/', authenticateToken, getArticlesHandler)

//Get Method - Display one single object

router.get('/:id', authenticateToken, getSpecificArticleHandler)

//Post Method

router.post('/', authenticateToken, postArticleHandler)

//Patch Method

router.patch("/:id", authenticateToken, patchArticleHandler)

// Delete Method

router.delete("/:id", authenticateToken, deleteArticleHandler)

export default router;