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
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const images_1 = require("../../../routes/images/images");
describe('image module testing', () => {
    it('should return the default urlParameters', () => {
        const defaultParameters = (0, images_1.saveUnwrappURLParameters)({
            height: 'test',
            width: 'daisoj',
        });
        expect(defaultParameters).toEqual({
            filename: 'fjord',
            fileType: '.jpg',
            height: 100,
            width: 100,
        });
    });
    it('should return an error for non existing images', () => {
        (0, images_1.resizeImage)({
            filename: 'nonExistingImage',
            fileType: '.jpg',
            height: 100,
            width: 100,
        }).then(result => {
            expect(result).toContain('Error found while resizing: ');
        });
    });
    it('should return an image when image exists', () => {
        //saveImageToThumb()
        (0, images_1.doesImageExist)({
            filename: 'fjord',
            fileType: '.jpg',
            height: 100,
            width: 100,
        }).then((result) => {
            expect(result).toBeInstanceOf(Buffer);
        });
    });
    it('should return an error when image does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expectAsync((0, images_1.doesImageExist)({
            filename: 'nonExistingImage',
            fileType: '.jpg',
            height: 100,
            width: 100,
        })).toBeRejectedWithError();
    }));
    it('should return an absolute path for fjord image', () => {
        const path = (0, images_1.getAbsolutePathForImage)('fjord', '.jpg', 'full');
        expect(path).toEqual((0, path_1.resolve)('assets/full/fjord.jpg'));
    });
});
