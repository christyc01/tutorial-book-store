import express from 'express';
import mongoose from 'mongoose';
import { PORT, mongoDBURL } from './config.js';

const app = express();

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
  console.log(req);
  return res.status(234).send('Hello from root');
});
