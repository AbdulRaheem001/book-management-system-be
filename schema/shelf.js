import mongoose from 'mongoose';

const { Schema } = mongoose;

const shelfSchema = new Schema({
  bookId: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  shelfType: {
    type: String,
    enum: ['Plan to Read', 'Reading', 'Completed'],
    default: 'Plan to Read',
  },
});

const Shelf = mongoose.model('Shelf', shelfSchema);

export default Shelf;
