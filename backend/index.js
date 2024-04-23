import express from 'express';
import { PORT } from './config.js';

const app = express();

app.get('/', (req, res) => {
  console.log(req);
  return res.status(234).send('Hello from root');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
