"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAbsolutePathForImage = exports.doesImageExist = exports.resizeImage = exports.saveUnwrappURLParameters = void 0;
const express_1 = __importDefault(require("express"));
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = require("fs");
const path_1 = require("path");
const images = express_1.default.Router();
images.get('/', (req, res) => {
    const urlParameter = saveUnwrappURLParameters(req.query);
    doesImageExist(urlParameter)
        .then((data) => {
        res.status(200).type(urlParameter.fileType).send(data);
    })
        .catch(() => {
        //Image does not yet exist
        resizeImage(urlParameter).then((data) => {
            console.log('data: ', typeof data);
            if (typeof data === 'string') {
                res.status(404).send(data);
                return;
            }
            res.status(200).type(urlParameter.fileType).send(data);
        });
    });
});
function getAbsolutePathForImage(imageName, imageType, topFolder) {
    return (0, path_1.resolve)(`assets/${topFolder}/${imageName}${imageType}`);
}
exports.getAbsolutePathForImage = getAbsolutePathForImage;
function doesImageExist(urlParameter) {
    //fs.readdir(getAbsolutePathForImage(`${urlParameter.filename}_${urlParameter.width}x${urlParameter.height}_thumps.jpg`, 'converted'))
    return fs_1.promises.readFile(getAbsolutePathForImage(`${urlParameter.filename}_${urlParameter.width}x${urlParameter.height}_thumps.jpg`, urlParameter.fileType, 'converted'));
}
exports.doesImageExist = doesImageExist;
//Missing return parameter
function resizeImage(urlParameter) {
    return (0, sharp_1.default)(getAbsolutePathForImage(urlParameter.filename, urlParameter.fileType, 'full'))
        .resize(urlParameter.width, urlParameter.height)
        .toFile(getAbsolutePathForImage(`${urlParameter.filename}_${urlParameter.width}x${urlParameter.height}_thumps.jpg`, urlParameter.fileType, 'converted'), (error) => {
        return `Error found while saving: ${error}`;
    })
        .jpeg()
        .toBuffer()
        .then((data) => {
        return data;
    })
        .catch((error) => {
        return `Error found while resizing: ${error}`;
    });
}
exports.resizeImage = resizeImage;
function saveUnwrappURLParameters(parameters) {
    return {
        filename: parameters.filename
            ? parameters.filename
            : 'fjord',
        fileType: '.jpg',
        width: Number(parameters.width)
            ? Number(parameters.width)
            : 100,
        height: Number(parameters.height)
            ? Number(parameters.height)
            : 100,
    };
}
exports.saveUnwrappURLParameters = saveUnwrappURLParameters;
exports.default = images;
