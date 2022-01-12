import express from 'express';
const router = express.Router()
import { postAuthHandler } from '../controllers/authController.js'
import { authErrorHandler } from '../middleware/errorHandlers.js'

router.post('/', authErrorHandler, postAuthHandler)

export default router