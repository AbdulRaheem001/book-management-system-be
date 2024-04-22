// shelfController.js
import shelfService from '../services/shelfService.js'; // Import the shelf service

const shelfController = {
  async addBookToShelf(req, res) {
    try {
        const userId = req.user._id;
      const { bookId, shelfType } = req.body;
      const shelfEntry = await shelfService.addBookToShelf(userId, bookId, shelfType);
      res.status(201).json({ message: 'Book added to shelf successfully', shelfEntry });
    } catch (error) {
      res.status(500).json({ message: 'Failed to add book to shelf', error: error.message });
    }
  },

  async moveBookBetweenShelves(req, res) {
    try {
      const { shelfEntryId, shelfType } = req.body;
      console.log('test', shelfEntryId);
      const updatedShelfEntry = await shelfService.moveBookBetweenShelves(shelfEntryId, shelfType);
      res.json({ message: 'Book moved between shelves successfully', updatedShelfEntry });
    } catch (error) {
      res.status(500).json({ message: 'Failed to move book between shelves', error: error.message });
    }
  },

  async getShelfData(req, res) {
    try {
        const userId = req.user._id;
      const shelfData = await shelfService.getShelfData(userId);
      const { readingBooks, completedBooks, planToReadBooks } = shelfData;
      res.json({ readingBooks, completedBooks, planToReadBooks });

    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch shelf data', error: error.message });
    }
  },
};

export default shelfController;
