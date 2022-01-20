import express from 'express';

import { addLoginValidation } from '../middleware/validation/login.validation.js';
import { postAuthHandler } from '../controllers/authController.js'
import { authErrorHandler } from '../middleware/errorHandlers.js'

const router = express.Router()

router.post('/', addLoginValidation, authErrorHandler, postAuthHandler)

export default router