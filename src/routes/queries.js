import express from 'express';
const router = express.Router()
import { authenticateToken } from '../middleware/verifyJWT.js'
import { 
    getQueryHandler,
    getSpecificQueryHandler,
    postQueryHandler,
    deleteQuerry
 } from '../controllers/queriesController.js'

//Get a list of all Queries

router.get('/', authenticateToken, getQueryHandler)

//Get one single query

router.get('/:id', authenticateToken, getSpecificQueryHandler)

// Post Querry

router.post('/', postQueryHandler)

// Delete Query

router.delete("/:id", authenticateToken, deleteQuerry)

export default router