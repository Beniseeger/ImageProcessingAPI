"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateInputParmeters = (req, res, next) => {
    let returnMessage = 'No Error';
    if (req.query.height === undefined ||
        req.query.width === undefined)
        returnMessage = 'Error: please specify a width and height for the api.';
    else if (Number.isNaN(parseInt(req.query.height))) {
        returnMessage =
            'Error: Please enter a positive number for the height of the image!';
    }
    else if (Number.isNaN(parseInt(req.query.width))) {
        returnMessage =
            'Error: Please enter a positive number for the width of the image!';
    }
    else if (req.query.filename === '' ||
        req.query.filename === undefined) {
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
exports.default = validateInputParmeters;
