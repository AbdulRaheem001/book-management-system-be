import Book from '../schema/book.js';
import shelfService from '../services/shelfService.js';
import { shelfType } from '../utils/shelfType.js';
const bookService = {

async createBook (userId, title, authorName, publicationHouse, publicationDate, genre, publicationYear) {
    const newBook = new Book({
      userId,
      title,
      authorName,
      publicationHouse,
      publicationDate,
      genre,
      publicationYear,
    });
    await newBook.save();
    shelfService.addBookToShelf(userId, newBook._id, shelfType[0]);
    
    return newBook;
  },

  async getBookById(bookId) {
    return Book.findById(bookId);
  },

  async updateBook(bookId, updatedFields) {
    const updatedBook = await Book.findByIdAndUpdate(bookId, updatedFields, { new: true });
    return updatedBook;
  },

  async deleteBook(bookId) {
    return Book.findByIdAndDelete(bookId);
  },

  async getAllBooks() {
    return Book.find();
  },
  async getAllUserBooks(userId) {
    return Book.find({ userId }).populate('userId');
  },
};

export default bookService;
