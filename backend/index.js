import express from 'express';
import mongoose from 'mongoose';
import { PORT, mongoDBURL } from './config.js';
import router from './routes/books/booksRoute.js';

const app = express();
app.use(express.json());
app.use('/books', router);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('Connected through Mongoose');
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));

app.get('/', (req, res) => {
  return res.status(234).send('Hello from root');
});
