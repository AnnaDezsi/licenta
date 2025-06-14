import express from 'express';

import { authenticateToken } from '../middleware/authMiddleware.js';
import { getMedicalCategoriesAndParameters } from '../services/analizeService.js';

const router = express.Router();
router.get('/categorii', authenticateToken, getMedicalCategoriesAndParameters)


export default router;
