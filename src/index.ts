import express from 'express';
import routes from './routes/index';
import loggerMiddleware from './middleware/middleware';

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server has started and is listening on localhost:${port}`);
});

app.use(loggerMiddleware);
app.use('/', routes);

export default app;
