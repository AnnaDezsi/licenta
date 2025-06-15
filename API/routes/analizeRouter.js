import express from 'express';

import { authenticateToken } from '../middleware/authMiddleware.js';
import { authorizeUserOrAdmin } from '../middleware/authorizationMiddleware.js';
import { createMedicalAnalysis, getMedicalCategoriesAndParameters, getUserAnalyzesById } from '../services/analizeService.js';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() }); 


const router = express.Router();
router.post('/', authenticateToken, upload.single('file'), createMedicalAnalysis);
router.get('/categorii', authenticateToken, getMedicalCategoriesAndParameters)
router.get('/:userId', authenticateToken, authorizeUserOrAdmin, getUserAnalyzesById);


export default router;
