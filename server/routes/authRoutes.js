import express from 'express';
import { register, login, getUserProfile } from '../controller/authController.js';
import { auth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', auth, getUserProfile);

export default router;
