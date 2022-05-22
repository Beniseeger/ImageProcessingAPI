"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loggerMiddleware = (req, res, next
//apiEndpoint: string
) => {
    console.log(`The endpoint: ${req.url} has been accessed`);
    next();
};
exports.default = loggerMiddleware;
