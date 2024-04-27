import express from 'express';
import mongoose from 'mongoose';
import { PORT, mongoDBURL } from './config.js';

const app = express();
app.use(express.json());

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
    if (!req.body.name) {
      console.log('req.body.name is missing');
      return res.status(400).send({
        message: 'Send all required fields',
      });
    }

    const testBook = {
      name: req.body.name,
      author: req.body.author,
      cost: req.body.cost,
    };
    const newlyCreatedBook = await BookModel.create(testBook);
    return res.status(201).send(newlyCreatedBook);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

app.get('/books', async (req, res) => {
  try {
    const bookList = await BookModel.find({});
    return res.status(200).json({ count: bookList.length, data: bookList });
    // throw new Error('mwahaha');
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

app.get('/books/:id', async (req, res) => {
  try {
    const book = await BookModel.findById(req.params.id);
    console.log('req.body.id:', req.body.id);
    return res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

app.put('/books/:id', async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).send({ message: 'Missing a required field' });
    }
    const book = await BookModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    return res
      .status(200)
      .json({ message: 'Book updated successfully!', data: book });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

app.delete('/books/:id', async (req, res) => {
  try {
    const book = await BookModel.findByIdAndDelete(req.params.id);
    if (!book) {
      res.status(404).json({ message: 'Book not found' });
    }
    return res.status(200).send({ message: 'Book deleted' });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

app.get('/', (req, res) => {
  return res.status(234).send('Hello from root');
});
