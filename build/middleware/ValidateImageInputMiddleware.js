"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateInputParmeters = (req, res, next) => {
    let returnMessage = 'No Error';
    if (Number.isNaN(parseInt(req.query.height))) {
        res.status(400).send('Please specify a height for the image!');
        returnMessage = 'Please specify a height for the image!';
    }
    else if (Number.isNaN(parseInt(req.query.width))) {
        res.status(400).send('Please specify a width for the image!');
        returnMessage = 'Please specify a width for the image!';
    }
    else if (req.query.filename === '') {
        res.status(400).send('Please specify an image which should be resized!');
        returnMessage = 'Please specify an image which should be resized!';
    }
    next();
    return returnMessage;
};
exports.default = validateInputParmeters;
