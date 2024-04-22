import express from 'express';
import { validateSignup, validateLoin } from '../validation/authValidation.js';
import authController from '../controller/authController.js';
import authenticateUser from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', validateSignup, authController.signup);
router.post('/login',validateLoin, authController.login);
router.post('/delete',authenticateUser, authController.deleteUser);
export default router;
