import express from 'express';

const loggerMiddleware = (
  req: express.Request,
  res: express.Response,
  next: Function
  //apiEndpoint: string
): void => {
  console.log(`The endpoint: ${req.url} has been accessed`);
  next();
};

export default loggerMiddleware;
