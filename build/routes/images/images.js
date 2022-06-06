"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeImage = exports.sanitizingURLParameters = void 0;
const express_1 = __importDefault(require("express"));
const sharp_1 = __importDefault(require("sharp"));
const fileSystemOperations_1 = __importDefault(require("../../utilities/fileSystemOperations"));
const validateImageInputMiddleware_1 = __importDefault(require("../../middleware/validateImageInputMiddleware"));
const images = express_1.default.Router();
images.use(validateImageInputMiddleware_1.default);
images.get('/', (req, res) => {
    sanitizingURLParameters(req.query).then(urlParameter => {
        if (typeof urlParameter === 'string') {
            res.status(404).send(urlParameter);
            return;
        }
        fileSystemOperations_1.default
            .getImageFromCache(urlParameter)
            .then((cachedImage) => {
            //Image exists and a chached one is returned.
            res.status(200).type('jpg').send(cachedImage);
        })
            .catch(() => {
            //Image does not yet exist and needs to be resized.
            resizeImage(urlParameter).then((image) => {
                //Check if an error was thrown during resizing
                if (typeof image === 'string') {
                    res.status(404).send(image);
                    return;
                }
                res.status(200).type('jpg').send(image);
            });
        });
    });
});
/**
 * Returns a resized image and saves it to the converted folder.
 *
 * @param urlParameter the image, width and height which should be resized.
 * @returns a resized image if it exists or throws an error.
 */
function resizeImage(urlParameter) {
    return (0, sharp_1.default)(fileSystemOperations_1.default.getAbsolutePathForFile(urlParameter.filename, 'full'))
        .resize(urlParameter.width, urlParameter.height)
        .toFile(fileSystemOperations_1.default.getAbsolutePathForFile(`${urlParameter.filename}_${urlParameter.width}x${urlParameter.height}_thumps`, 'converted'), (error) => {
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
function sanitizingURLParameters(parameters) {
    //Check if the image exists
    return fileSystemOperations_1.default
        .doesFileExist(fileSystemOperations_1.default.getAbsolutePathForFile(parameters.filename, 'full'))
        .then(() => {
        const tmpFilename = parameters.filename;
        const tmpWidth = saveUnwrapURLParameterToNumber(parameters.width, 'width');
        const tmpHeight = saveUnwrapURLParameterToNumber(parameters.height, 'height');
        if (typeof tmpHeight === 'string' && typeof tmpWidth === 'string') {
            return tmpHeight + '<br>' + tmpWidth;
        }
        else if (typeof tmpHeight === 'string' ||
            typeof tmpWidth === 'string') {
            return typeof tmpHeight === 'string'
                ? tmpHeight
                : tmpWidth;
        }
        return {
            filename: tmpFilename,
            width: tmpWidth,
            height: tmpHeight,
        };
    })
        .catch((error) => {
        return `Please specify an image which exists in the full folder: <br> ${error}`;
    });
}
exports.sanitizingURLParameters = sanitizingURLParameters;
/**
 * Save unwraps the provided url parameters to number
 * @param parameters the parameter which should be converted to number
 * @returns number from provided url parameter
 */
function saveUnwrapURLParameterToNumber(urlParameter, parameterName) {
    let tmpParameter;
    try {
        tmpParameter = parseInt(urlParameter);
        if (Number.isNaN(tmpParameter) || tmpParameter <= 0)
            return `Please enter a positive number for ${parameterName} greater than 0`;
    }
    catch (error) {
        return `Error while unwrapping ${parameterName}! Please enter a number as ${parameterName}: <br>${error}`;
    }
    return tmpParameter;
}
exports.default = images;
