import express from 'express';
import routes from './routes/index';
import middleware from './middleware/middleware';

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server has started and is listening on localhost:${port}`);
});

app.use(middleware.loggerMiddleware, middleware.validateURLParameters);
app.use('/', routes);

export default app;
