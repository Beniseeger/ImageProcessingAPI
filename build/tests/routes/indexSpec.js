"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const indexSpec_1 = __importDefault(require("../indexSpec"));
describe('testing image route', () => {
    describe('testing status response of image route', () => {
        it('should return status 200 if all parameters are provided', () => {
            //Should return 400 because no parameters are provided
            indexSpec_1.default
                .get('/images?width=100&height=100&filename=fjord')
                .then((result) => {
                expect(result.status).toBe(200);
            });
        });
        it('should return status 400 for the initial image route', () => {
            //Should return 400 because no parameters are provided
            indexSpec_1.default.get('/images').then((result) => {
                expect(result.status).toBe(400);
            });
        });
        it('should return 400 if no valid input is provided', () => {
            indexSpec_1.default
                .get('/images?height=Tests&width=Test')
                .then((result) => {
                expect(result.status).toBe(400);
            });
        });
        it('should responde with a 404 error for a non existing images', () => {
            indexSpec_1.default
                .get('/images?width=100&height=100&filename=nonExistImage')
                .then((result) => {
                expect(result.status).toBe(404);
            });
        });
    });
    describe('testing error responses of image route', () => {
        it('should return an error when image is not found', () => {
            indexSpec_1.default
                .get('/images?width=100&height=100&filename=nonExistImage')
                .then((result) => {
                expect(result.text).toContain('We could not resize your image due to the following reason:');
            });
        });
    });
});
