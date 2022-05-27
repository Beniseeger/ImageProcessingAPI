"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = loggerMiddleware;
