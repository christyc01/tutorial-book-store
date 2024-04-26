import express from 'express';
import mongoose from 'mongoose';
import { PORT, mongoDBURL } from './config.js';

const app = express();

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  author: String,
  cost: Number,
});

const BookModel = mongoose.model('Book', bookSchema);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('Connected through Mongoose');
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));

app.post('/books', async (req, res) => {
  try {
    const testBook = {
      name: 'test name',
      author: 'test author',
      cost: 3,
    };
    const newlyCreatedBook = await BookModel.create(testBook);
    // throw new Error('mwahahahaha'); // Testing the catch block
    return res.status(201).send(newlyCreatedBook);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

app.get('/', (req, res) => {
  console.log(req);
  return res.status(234).send('Hello from root');
});
