import express from 'express';
import { getLatestEndocrinologyTest } from '../controllers/medicalTestsController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route to get the latest endocrinology test for a specific patient
router.get('/latest-endocrinology/:patientId', authenticateToken, getLatestEndocrinologyTest);

export default router;
