"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    console.log(req.query);
    const urlParameter = saveUnwrappURLParameters(req.query);
    const imageExists = doesImageExist(urlParameter)
        .then(data => {
        sendResizedImageResponse(data, 'jpg', res);
    })
        .catch(() => {
        //Image does not yet exist
        resizeImage(urlParameter).then((data) => {
            console.log('data: ', typeof data);
            if (typeof data === 'string') {
                res.status(404).send(data);
                return;
            }
            saveImageToThumb(data, urlParameter).then(() => sendResizedImageResponse(data, 'jpg', res));
        });
    });
});
function getAbsolutePathForImage(imageName, imageType, topFolder) {
    return (0, path_1.resolve)(`assets/${topFolder}/${imageName}${imageType}`);
}
exports.getAbsolutePathForImage = getAbsolutePathForImage;
function sendResizedImageResponse(image, imageType, res) {
    res.status(200).type(imageType).send(image);
}
function saveImageToThumb(image, urlParameter) {
    return fs_1.promises.writeFile(getAbsolutePathForImage(`${urlParameter.filename}_${urlParameter.width}x${urlParameter.height}_thumps.jpg`, urlParameter.fileType, 'converted'), image);
}
function doesImageExist(urlParameter) {
    //fs.readdir(getAbsolutePathForImage(`${urlParameter.filename}_${urlParameter.width}x${urlParameter.height}_thumps.jpg`, 'converted'))
    return fs_1.promises.readFile(getAbsolutePathForImage(`${urlParameter.filename}_${urlParameter.width}x${urlParameter.height}_thumps.jpg`, urlParameter.fileType, 'converted'));
}
exports.doesImageExist = doesImageExist;
//Missing return parameter
function resizeImage(urlParameter) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, sharp_1.default)(getAbsolutePathForImage(urlParameter.filename, urlParameter.fileType, 'full'))
            .resize(urlParameter.width, urlParameter.height)
            .jpeg()
            .toBuffer()
            .then(data => {
            return data;
        })
            .catch(error => {
            return `Error found while resizing: ${error}`;
        });
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
