import express from 'express';
import routes from './routes/index';

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server has started and is listening on localhost:${port}`);
});

app.use('/', routes);
