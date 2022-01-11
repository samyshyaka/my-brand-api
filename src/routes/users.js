import express from 'express';
const router = express.Router();
import { 
    getUsersHandler,
    postUserHandler
} from '../controllers/usersController.js'

router.get('/', getUsersHandler)

router.post('/', postUserHandler)

export default router