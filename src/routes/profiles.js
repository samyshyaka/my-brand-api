import express from 'express';
const router = express.Router()
import { authenticateToken } from '../middleware/verifyJWT.js'
import {
    getProfilesHandler,
    getSpecificProfilesHandler,
    postProfileHandler,
    putProfileHandler,
    deleteProfileHandler
} from '../controllers/profileController.js'

//Get Method

router.get('/', getProfilesHandler)

//Get Method - Display one single object

router.get('/:id', getSpecificProfilesHandler)

//Post Method

router.post('/', authenticateToken, postProfileHandler)

//Edit Method

router.put("/:id", authenticateToken, putProfileHandler)

// Delete Method

router.delete("/:id", authenticateToken, deleteProfileHandler)

export default router