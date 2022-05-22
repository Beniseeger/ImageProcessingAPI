"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loggerMiddleware = (req, res, next) => {
    console.log(`The endpoint: ${req.url} has been accessed`);
    next();
    return `The endpoint: ${req.url} has been accessed`;
};
const validateURLParameters = (req, res, next) => {
    try {
        parseInt(req.query.height);
        parseInt(req.query.width);
    }
    catch (error) {
        res.status(404).send(error);
    }
    next();
};
exports.default = { loggerMiddleware, validateURLParameters };
