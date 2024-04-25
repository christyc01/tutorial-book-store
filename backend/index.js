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

app.post('/post', async (req, res) => {
  const testBook = new BookModel({
    name: 'test name',
    author: 'test author',
    cost: 3,
  });
  await testBook.save();
  res.send(testBook);
});

app.get('/', (req, res) => {
  console.log(req);
  return res.status(234).send('Hello from root');
});
