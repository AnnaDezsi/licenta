import express from 'express';
import { login, signup } from '../controllers/authController.js';
import { validateSignup } from '../middleware/signupMiddleware.js';

const router = express.Router();

router.post('/signup', validateSignup, signup);
router.post('/login', login);


export default router;
