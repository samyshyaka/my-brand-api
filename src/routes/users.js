import express from 'express';

import { authenticateToken } from '../middleware/verifyJWT.js'
import { addUserValidation } from '../middleware/validation/user.validation.js';
import { usersErrorHandler } from '../middleware/errorHandlers.js';
import { 
    getUsersHandler,
    postUserHandler
} from '../controllers/usersController.js'

const router = express.Router();

router.get('/', authenticateToken, getUsersHandler)

router.post('/',addUserValidation, usersErrorHandler, postUserHandler)

export default router