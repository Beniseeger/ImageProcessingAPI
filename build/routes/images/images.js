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
const validateImageInputMiddleware_1 = __importDefault(require("../../middleware/validateImageInputMiddleware"));
const images = express_1.default.Router();
images.use(validateImageInputMiddleware_1.default);
images.get('/', (req, res) => {
    const urlParameter = saveUnwrappURLParameters(req.query);
    doesImageExist(urlParameter)
        .then((cachedImage) => {
        //Image exists and a chached one is returned.
        res.status(200).type(urlParameter.fileType).send(cachedImage);
    })
        .catch(() => {
        //Image does not yet exist and needs to be resized.
        resizeImage(urlParameter).then((image) => {
            //Check if an error was thrown during resizing
            if (typeof image === 'string') {
                res.status(404).send(image);
                return;
            }
            res.status(200).type(urlParameter.fileType).send(image);
        });
    });
});
/**
 * Returns an absolute Path for a given image name
 *
 * @param imageName name of the image which will be looked after
 * @param imageType image type
 * @param topFolder top level folder where the image is located.
 * @returns
 */
function getAbsolutePathForImage(imageName, imageType, topFolder) {
    return (0, path_1.resolve)(`assets/${topFolder}/${imageName}${imageType}`);
}
exports.getAbsolutePathForImage = getAbsolutePathForImage;
/**
 * Returns an image as buffer if it exists or an error if it doesnt.
 *
 * @params urlParameters: the image to be looked out for.
 * @returns Buffer or Error if image exists or not
 */
function doesImageExist(urlParameter) {
    return fs_1.promises.readFile(getAbsolutePathForImage(`${urlParameter.filename}_${urlParameter.width}x${urlParameter.height}_thumps`, urlParameter.fileType, 'converted'));
}
exports.doesImageExist = doesImageExist;
/**
 * Returns a resized image and saves it to the converted folder.
 *
 * @param urlParameter the image, width and height which should be resized.
 * @returns a resized image if it exists or throws an error.
 */
function resizeImage(urlParameter) {
    return (0, sharp_1.default)(getAbsolutePathForImage(urlParameter.filename, urlParameter.fileType, 'full'))
        .resize(urlParameter.width, urlParameter.height)
        .toFile(getAbsolutePathForImage(`${urlParameter.filename}_${urlParameter.width}x${urlParameter.height}_thumps`, urlParameter.fileType, 'converted'), (error) => {
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
/**
 * Returns object of the necessary url parameters
 * @param parameters the url parameters passed in by the user
 * @returns an object of necessary url parameters
 */
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
