import express from 'express';
import { addCommentValidation } from '../middleware/validation/comment.validation.js';
import { addEditCommentValidation } from '../middleware/validation/editComment.validation.js';
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

router.post('/', addCommentValidation, authenticateToken, postCommentHandler)

//Edit Comment

router.put("/:id", addEditCommentValidation, authenticateToken, putCommentHandler)

// Delete Comment

router.delete("/:id", authenticateToken, deleteCommentHandler)

export default router;