import express from 'express';
import routes from './routes/index';
import loggerMiddleware from './middleware/logger';

const app = express();
const port = 3000;

app.get('/api', (req, res) => {
  res.send('Hello');
});

app.listen(port, () => {
  console.log(`Server has started and is listening on localhost:${port}`);
});

app.use(loggerMiddleware);
app.use('/', routes);

export default app;
