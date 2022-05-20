import express from 'express';
import images from './images/images';

const routes = express.Router();

routes.get('/', (req, res) => {
  res.status(200).send('OK');
});

routes.use('/images', images);

export default routes;
