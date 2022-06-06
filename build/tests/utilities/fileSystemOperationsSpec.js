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
const path_1 = require("path");
const fileSystemOperations_1 = __importDefault(require("../../utilities/fileSystemOperations"));
describe('testing the file system utilities', () => {
    it('should return a cached image when image exists', () => {
        fileSystemOperations_1.default
            .getImageFromCache({
            filename: 'fjord.jpg',
            height: 100,
            width: 100,
        })
            .then((result) => {
            expect(result).toBeInstanceOf(Buffer);
        })
            .catch(() => {
            //Error would be thrown if a image does not exists
            expect(true).toBeFalse();
        });
    });
    it('should return an error when image does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expectAsync(fileSystemOperations_1.default.getImageFromCache({
            filename: 'nonExistingImage',
            height: 100,
            width: 100,
        })).toBeRejectedWithError();
    }));
    it('should return an absolute path for fjord image', () => {
        const path = fileSystemOperations_1.default.getAbsolutePathForFile('fjord.jpg', 'full');
        expect(path).toEqual((0, path_1.resolve)('assets/full/fjord.jpg'));
    });
    it('should not catch an error if a file exists in full folder', () => {
        fileSystemOperations_1.default
            .doesFileExist(fileSystemOperations_1.default.getAbsolutePathForFile('fjord.jpg', 'full'))
            .then(() => {
            expect(true).toBeTrue();
        })
            .catch(() => {
            expect(true).toBeFalse();
        });
    });
    it('should catch an error if a file does not exists in full folder', () => {
        fileSystemOperations_1.default
            .doesFileExist(fileSystemOperations_1.default.getAbsolutePathForFile('UnknownFile.jpg', 'full'))
            .then(() => {
            expect(true).toBeFalse();
        })
            .catch(() => {
            expect(true).toBeTrue();
        });
    });
});
