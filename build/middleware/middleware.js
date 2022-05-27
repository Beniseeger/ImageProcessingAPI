'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
/**
 * Returns the api point accessed by the user.
 * @param req request paramters of type express.Request
 * @param res response parameters of type express.Reponse
 * @param next next middleware
 * @returns the api point accessed by the user and logs it in the console.
 */
const loggerMiddleware = (req, res, next) => {
  console.log(`The endpoint: ${req.url} has been accessed`);
  next();
  return `The endpoint: ${req.url} has been accessed`;
};
const validateInputParmeters = (req, res, next) => {
  if (Number.isNaN(parseInt(req.query.height))) {
    res.status(400).send('Please specify a height for the image!');
    return 'Error';
  } else if (Number.isNaN(parseInt(req.query.width))) {
    res.status(400).send('Please specify a width for the image!');
    return 'Error';
  }
  next();
  return `The endpoint: ${req.url} has been accessed`;
};
exports.default = { loggerMiddleware, validateInputParmeters };
