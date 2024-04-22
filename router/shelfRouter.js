// shelfRouter.js
import express from 'express';
import shelfController from '../controller/shelfController.js';
import authenticateUser from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/', authenticateUser, shelfController.getShelfData);
router.post('/add', authenticateUser, shelfController.addBookToShelf);
router.put('/move', authenticateUser, shelfController.moveBookBetweenShelves);


export default router;
