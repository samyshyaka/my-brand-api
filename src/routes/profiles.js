import express from 'express';
const router = express.Router()
import { addProfileValidation } from '../middleware/validation/profile.validation.js';
import { addEditProfileValidation } from '../middleware/validation/editProfile.validation.js';
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

router.post('/', addProfileValidation, authenticateToken, postProfileHandler)

//Edit Method

router.put("/:id", addEditProfileValidation, authenticateToken, putProfileHandler)

// Delete Method

router.delete("/:id", authenticateToken, deleteProfileHandler)

export default router