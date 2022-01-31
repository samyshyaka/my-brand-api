import express from 'express';
import { addEditCommentValidation } from '../middleware/validation/editComment.validation.js';
import { authenticateToken } from '../middleware/verifyJWT.js'
import { 
    getCommentsHandler, 
    getSpecificCommentHandler,
    putCommentHandler,
    deleteCommentHandler 
    } from '../controllers/commentController.js'
    

const router = express.Router()

router.get('/', getCommentsHandler)

router.get('/:id', getSpecificCommentHandler)

router.put('/:id', addEditCommentValidation, authenticateToken, putCommentHandler)

router.delete('/:id', authenticateToken, deleteCommentHandler)

export default router;