import express from 'express';
const router = express.Router()
import { authenticateToken } from '../middleware/verifyJWT.js'
import { 
    getQueryHandler,
    getSpecificQueryHandler,
    deleteQuerry
 } from '../controllers/queriesController.js'

//Get Method

router.get('/', authenticateToken, getQueryHandler)

//Get Method - Display one single object

router.get('/:id', authenticateToken, getSpecificQueryHandler)

// Delete Method

router.delete("/:id", authenticateToken, deleteQuerry)

export default router