import express from 'express';

import { addUserValidation } from '../middleware/validation/user.validation.js';
import { usersErrorHandler } from '../middleware/errorHandlers.js';
import { postUserHandler } from '../controllers/usersController.js'

const router = express.Router();

router.post('/', usersErrorHandler, postUserHandler)

export default router