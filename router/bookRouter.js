import express from 'express';
import bookController from '../controller/bookController.js';
import authenticateUser from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/',authenticateUser, bookController.getAllUserBooks);
router.get('/:bookId',authenticateUser, bookController.getBook);
router.post('/addBook',authenticateUser, bookController.createBook);
router.put('/:bookId',authenticateUser, bookController.updateBook);
router.delete('/:bookId',authenticateUser, bookController.deleteBook);

export default router;
