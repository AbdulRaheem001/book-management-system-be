import bookService from '../services/bookService.js';

const bookController = {
  async createBook(req, res) {
    try {
      const userId = req.user._id;
      const { title, authorName, publicationHouse, publicationDate, genre, publicationYear } = req.body;
      const newBook = await bookService.createBook(userId, title, authorName, publicationHouse, publicationDate, genre, publicationYear);
      res.status(201).json(newBook);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async getBook(req, res) {
    try {
      const { bookId } = req.params;
      const book = await bookService.getBookById(bookId);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.json(book);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async updateBook(req, res) {
    try {
      const { bookId } = req.params;
      const updatedFields = req.body;
      const updatedBook = await bookService.updateBook(bookId, updatedFields);
      if (!updatedBook) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.json(updatedBook);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async deleteBook(req, res) {
    try {
      const { bookId } = req.params;
      const deletedBook = await bookService.deleteBook(bookId);
      if (!deletedBook) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.json({ message: 'Book deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async getAllBooks(req, res) {
    try {
      const books = await bookService.getAllBooks();
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  async getAllUserBooks(req, res){
    try{
      const userId = req.user._id;
      const books = await bookService.getAllUserBooks(userId);
      res.json(books);
    }catch(err){
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};

export default bookController;
