import express from 'express';

const loggerMiddleware = (
  req: express.Request,
  res: express.Response,
  next: Function
): string => {
  console.log(`The endpoint: ${req.url} has been accessed`);

  next();
  return `The endpoint: ${req.url} has been accessed`;
};

const validateURLParameters = (
  req: express.Request,
  res: express.Response,
  next: Function
) => {
  try {
    parseInt(req.query.height as string);
    parseInt(req.query.width as string);
  } catch (error) {
    res.status(404).send(error);
  }

  next();
};

export default { loggerMiddleware, validateURLParameters };
