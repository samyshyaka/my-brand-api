import express from 'express';
import { authenticateToken } from '../middleware/verifyJWT.js'
import { 
    getCommentsHandler, 
    getSpecificCommentHandler,
    postCommentHandler,
    putCommentHandler,
    deleteCommentHandler 
    } from '../controllers/commentController.js'

const router = express.Router()

//Get Comments

router.get('/', getCommentsHandler)

//Get Specific Comment

router.get('/:id', getSpecificCommentHandler)

//Post Comment

router.post('/', authenticateToken, postCommentHandler)

//Edit Comment

router.put("/:id", authenticateToken, putCommentHandler)

// Delete Comment

router.delete("/:id", authenticateToken, deleteCommentHandler)

export default router;