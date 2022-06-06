"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const images_1 = require("../../../routes/images/images");
describe('testing image module', () => {
    it('should throw an error when image does not exist', () => {
        (0, images_1.sanitizingURLParameters)({
            filename: 'undefined',
            height: 'test',
            width: '100',
        })
            .then((urlParameter) => {
            expect(urlParameter).toContain('Please specify an image which exists in the full folder:');
        })
            .catch(() => {
            //Error would be thrown if a image does not exists
            expect(true).toBeFalse();
        });
    });
    it('should throw an error for non positive height numbers', () => {
        (0, images_1.sanitizingURLParameters)({
            filename: 'fjord.jpg',
            height: 'test',
            width: '100',
        })
            .then((urlParameter) => {
            expect(urlParameter).toContain('Please enter a positive number for height greater than 0');
        })
            .catch(() => {
            //Error would be thrown if a image does not exists
            expect(true).toBeFalse();
        });
    });
    it('should throw an error for non positive width numbers', () => {
        (0, images_1.sanitizingURLParameters)({
            filename: 'fjord.jpg',
            height: '100',
            width: 'test',
        })
            .then((urlParameter) => {
            expect(urlParameter).toContain('Please enter a positive number for width greater than 0');
        })
            .catch(() => {
            //Error would be thrown if a image does not exists
            expect(true).toBeFalse();
        });
    });
    it('should throw an error for non existing height / width', () => {
        (0, images_1.sanitizingURLParameters)({
            filename: 'fjord.jpg',
            height: '100',
            width: 'test',
        })
            .then((urlParameter) => {
            expect(urlParameter).toContain('Please enter a positive number for width greater than 0');
        })
            .catch(() => {
            //Error would be thrown if a image does not exists
            expect(true).toBeFalse();
        });
    });
    it('should return an error for non existing images', () => {
        (0, images_1.resizeImage)({
            filename: 'nonExistingImage',
            height: 100,
            width: 100,
        }).then((result) => {
            expect(result).toContain('Error found while resizing: Error: Input file is missing: ');
        });
    });
});
