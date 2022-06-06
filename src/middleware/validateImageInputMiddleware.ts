import express, { NextFunction } from 'express';

const validateInputParmeters = (
  req: express.Request,
  res: express.Response,
  next: NextFunction
): string => {
  let returnMessage = 'No Error';

  if (
    (req.query.height as string) === undefined ||
    (req.query.width as string) === undefined
  )
    returnMessage = 'Error: please specify a width and height for the api.';
  else if (Number.isNaN(parseInt(req.query.height as string))) {
    returnMessage =
      'Error: Please enter a positive number for the height of the image!';
  } else if (Number.isNaN(parseInt(req.query.width as string))) {
    returnMessage =
      'Error: Please enter a positive number for the width of the image!';
  } else if (
    (req.query.filename as string) === '' ||
    req.query.filename === undefined
  ) {
    returnMessage =
      'Error: Please specify an image by the parameter filename which should be resized!';
  }

  if (returnMessage === 'No Error') {
    next();
    return returnMessage;
  }

  res.status(400).send(returnMessage);
  return returnMessage;
};

export default validateInputParmeters;
