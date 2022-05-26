import express, { NextFunction } from 'express';

const validateInputParmeters = (
  req: express.Request,
  res: express.Response,
  next: NextFunction
): string => {
  let returnMessage: string = 'No Error';

  if (Number.isNaN(parseInt(req.query.height as string))) {
    returnMessage = 'Please specify a height for the image!';
  } else if (Number.isNaN(parseInt(req.query.width as string))) {
    returnMessage = 'Please specify a width for the image!';
  } else if (
    (req.query.filename as string) === '' ||
    req.query.filename === undefined
  ) {
    returnMessage = 'Please specify an image which should be resized!';
  }

  if (returnMessage === 'No Error') {
    next();
    return returnMessage;
  }

  res.status(400).send(returnMessage);
  return returnMessage;
};

export default validateInputParmeters;
