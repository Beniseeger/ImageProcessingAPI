import express, { NextFunction } from 'express';

const validateInputParmeters = (
  req: express.Request,
  res: express.Response,
  next: NextFunction
): string => {
  let returnMessage: string = 'No Error';

  if (Number.isNaN(parseInt(req.query.height as string))) {
    res.status(400).send('Please specify a height for the image!');
    returnMessage = 'Please specify a height for the image!';
  } else if (Number.isNaN(parseInt(req.query.width as string))) {
    res.status(400).send('Please specify a width for the image!');
    returnMessage = 'Please specify a width for the image!';
  } else if ((req.query.filename as string) === '') {
    res.status(400).send('Please specify an image which should be resized!');
    returnMessage = 'Please specify an image which should be resized!';
  }

  next();
  return returnMessage;
};

export default validateInputParmeters;
