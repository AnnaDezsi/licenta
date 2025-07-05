import express from 'express';

import { authenticateToken } from '../middleware/authMiddleware.js';
import { authorizeAdminOrDoctor, authorizeUserOrDoctor } from '../middleware/authorizationMiddleware.js';
import { assignDoctorToAnalyze, createMedicalAnalysis, getMedicalCategoriesAndParameters, getUserAnalyzesById, saveDiagnosis, startMLForAnalyzeId } from '../services/analizeService.js';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() }); 


const router = express.Router();
router.post('/', authenticateToken, upload.single('file'), createMedicalAnalysis);
router.post('/assignDoctor', authenticateToken, authorizeAdminOrDoctor, assignDoctorToAnalyze)
router.get('/categorii', authenticateToken, getMedicalCategoriesAndParameters)
router.get('/:userId', authenticateToken, authorizeUserOrDoctor, getUserAnalyzesById);
router.post('/mlstart', authenticateToken, startMLForAnalyzeId);
router.post('/diagnosis/:analyzeId', authenticateToken, authorizeAdminOrDoctor, saveDiagnosis)


export default router;
