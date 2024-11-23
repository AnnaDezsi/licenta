import express from 'express';
import { personalDataSetup } from '../controllers/personalDataController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { validatePersonalDataSetup } from '../middleware/personalDataMiddleware.js';

const router = express.Router();

router.post('/', authenticateToken,  validatePersonalDataSetup, personalDataSetup);
export default router;