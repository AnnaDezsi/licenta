import express from 'express';

import { authenticateToken } from '../middleware/authMiddleware.js';
import { authorizeAdminOrDoctor, authorizeUserOrDoctor } from '../middleware/authorizationMiddleware.js';
import { assignDoctorToAnalyze, createMedicalAnalysis, deleteUserAnalyzeById, getMedicalCategoriesAndParameters, getUserAnalyzeById, getUserAnalyzesById, saveDiagnosis, startMLForAnalyzeId } from '../services/analizeService.js';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() }); 


const router = express.Router();
router.post('/diagnosis/:analyzeId', authenticateToken, authorizeAdminOrDoctor, saveDiagnosis)
router.post('/', authenticateToken, upload.single('file'), createMedicalAnalysis);
router.post('/assignDoctor', authenticateToken, authorizeAdminOrDoctor, assignDoctorToAnalyze)
router.get('/categorii', authenticateToken, getMedicalCategoriesAndParameters)
router.get('/:userId', authenticateToken, authorizeUserOrDoctor, getUserAnalyzesById);
router.get('/:userId/:analyzeId', authenticateToken, authorizeUserOrDoctor, getUserAnalyzeById)
router.delete('/:userId/:analyzeId', authenticateToken, authorizeUserOrDoctor, deleteUserAnalyzeById)
router.post('/mlstart', authenticateToken, startMLForAnalyzeId);


export default router;
