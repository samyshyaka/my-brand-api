import express from 'express';
const router = express.Router()
import { postAuthHandler } from '../controllers/authController.js'


router.post('/', postAuthHandler)

export default router