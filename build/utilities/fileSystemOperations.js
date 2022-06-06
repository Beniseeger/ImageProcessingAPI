"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
/**
 * Returns an image as buffer if it exists or an error if it doesnt.
 *
 * @params urlParameters: the image to be looked out for.
 * @returns Buffer or Error if image exists or not
 */
function getImageFromCache(urlParameter) {
    return fs_1.promises.readFile(getAbsolutePathForFile(`${urlParameter.filename}_${urlParameter.width}x${urlParameter.height}_thumps`, 'converted'));
}
/**
 * Returns an absolute Path for a given image name
 *
 * @param imageName name of the image which will be looked after
 * @param imageType image type
 * @param topFolder top level folder where the image is located.
 * @returns
 */
function getAbsolutePathForFile(filename, topFolder) {
    return (0, path_1.resolve)(`assets/${topFolder}/${filename}`);
}
function doesFileExist(filepath) {
    return fs_1.promises.access(filepath);
}
exports.default = {
    getImageFromCache,
    getAbsolutePathForFile,
    doesFileExist,
};
