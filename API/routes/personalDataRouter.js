import express from 'express';
import { getAllClients, getAllUsers, getPersonalData, getPersonalDataById, personalDataSetup, personalDataUpdate, userPersonalDataUpdate } from '../controllers/personalDataController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { validatePersonalDataSetup } from '../middleware/personalDataMiddleware.js';
import { authorizeAdmin, authorizeDoctor } from '../middleware/authorizationMiddleware.js';

const router = express.Router();

router.get('/', authenticateToken, getPersonalData)
router.get('/user/:userId', authenticateToken, authorizeAdmin, getPersonalDataById)
router.put('/user/:userId', authenticateToken, authorizeAdmin, userPersonalDataUpdate)
router.post('/', authenticateToken,  validatePersonalDataSetup, personalDataSetup);
router.put('/', authenticateToken, personalDataUpdate)
router.get('/clients', authenticateToken,authorizeDoctor, getAllClients)
router.get('/users', authenticateToken,authorizeAdmin, getAllUsers)

export default router;