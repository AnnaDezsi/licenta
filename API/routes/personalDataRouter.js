import express from 'express';
import { getAllClients, getPersonalData, personalDataSetup, personalDataUpdate } from '../controllers/personalDataController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { validatePersonalDataSetup } from '../middleware/personalDataMiddleware.js';

const router = express.Router();

router.get('/', authenticateToken, getPersonalData)
router.post('/', authenticateToken,  validatePersonalDataSetup, personalDataSetup);
router.put('/', authenticateToken, personalDataUpdate)
router.get('/clients', authenticateToken, getAllClients)

export default router;