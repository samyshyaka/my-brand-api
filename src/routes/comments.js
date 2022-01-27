import express from 'express';
import { addEditCommentValidation } from '../middleware/validation/editComment.validation.js';
import { authenticateToken } from '../middleware/verifyJWT.js'
import { 
    getCommentsHandler, 
    getSpecificCommentHandler,
    putCommentHandler,
    deleteCommentHandler 
    } from '../controllers/commentController.js'

import cors from 'cors';

const router = express.Router()

router.get('/', cors(), getCommentsHandler)

router.get('/:id', cors(), getSpecificCommentHandler)

router.put("/:id", cors(), addEditCommentValidation, authenticateToken, putCommentHandler)

router.delete("/:id", cors(), authenticateToken, deleteCommentHandler)

export default router;