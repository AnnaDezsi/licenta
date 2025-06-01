import express from 'express';
import { getAllClients, getAllUsers, getPersonalData, getPersonalDataById, personalDataSetup, personalDataUpdate } from '../controllers/personalDataController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { validatePersonalDataSetup } from '../middleware/personalDataMiddleware.js';
import { authorizeAdmin, authorizeDoctor } from '../middleware/authorizationMiddleware.js';

const router = express.Router();

router.get('/', authenticateToken, getPersonalData)
router.get('/user/:userId', authenticateToken, getPersonalDataById)
router.put('/user/:userId', authenticateToken, personalDataUpdate)
router.post('/', authenticateToken,  validatePersonalDataSetup, personalDataSetup);
router.get('/clients', authenticateToken,authorizeDoctor, getAllClients)
router.get('/users', authenticateToken,authorizeAdmin, getAllUsers)

export default router;