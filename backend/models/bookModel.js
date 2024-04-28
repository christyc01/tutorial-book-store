import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  author: String,
  cost: Number,
});

export const BookModel = mongoose.model('Book', bookSchema);
