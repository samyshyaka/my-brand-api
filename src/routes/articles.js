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

//Get Articles

router.get('/', getArticlesHandler)

//Get Specific Article

router.get('/:id', getSpecificArticleHandler)

//Post Article

router.post('/', authenticateToken, postArticleHandler)

//Patch Article

router.patch("/:id", authenticateToken, patchArticleHandler)

// Delete Article

router.delete("/:id", authenticateToken, deleteArticleHandler)

export default router;