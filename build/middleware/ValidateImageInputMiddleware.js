"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateInputParmeters = (req, res, next) => {
    let returnMessage = 'No Error';
    if (Number.isNaN(parseInt(req.query.height))) {
        returnMessage = 'Please specify a height for the image!';
    }
    else if (Number.isNaN(parseInt(req.query.width))) {
        returnMessage = 'Please specify a width for the image!';
    }
    else if (req.query.filename === '' ||
        req.query.filename === undefined) {
        returnMessage = 'Please specify an image which should be resized!';
    }
    if (returnMessage === 'No Error') {
        next();
        return returnMessage;
    }
    res.status(400).send(returnMessage);
    return returnMessage;
};
exports.default = validateInputParmeters;
