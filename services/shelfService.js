// shelfService.js
import Shelf from '../schema/shelf.js'; // Import the Shelf model
import { shelfType } from '../utils/shelfType.js';

const shelfService = {
  async addBookToShelf(userId, bookId, shelfType) {
    const shelfEntry = new Shelf({ userId, bookId, shelfType });
    await shelfEntry.save();
    return shelfEntry;
  },

  async moveBookBetweenShelves(shelfEntryId, shelfType) {
    const updatedShelfEntry = await Shelf.findByIdAndUpdate(
      shelfEntryId,
      { shelfType },
      { new: true }
    );
    return updatedShelfEntry;
  },

  async getShelfData(userId) {
    try {
      const shelfEntries = await Shelf.find({ userId }).populate('bookId');
      const readingBooks = shelfEntries.filter(entry => entry.shelfType === shelfType[1]);
      const completedBooks = shelfEntries.filter(entry => entry.shelfType === shelfType[2]);
      const planToReadBooks = shelfEntries.filter(entry => entry.shelfType === shelfType[0]);
      
      return {
        readingBooks,
        completedBooks,
        planToReadBooks,
      };
    } catch (error) {
      throw new Error('Failed to fetch shelf data');
    }
  },
};

export default shelfService;
