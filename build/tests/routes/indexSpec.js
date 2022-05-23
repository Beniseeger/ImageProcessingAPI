"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../index"));
const supertest_1 = __importDefault(require("supertest"));
const request = (0, supertest_1.default)(index_1.default);
describe('testing image route', () => {
    describe('testing status response of image route', () => {
        it('should return status 200 for the initial image route', () => {
            request.get('/images').then((result) => {
                expect(result.status).toBe(200);
            });
        });
        it('should use the default values and return 200 when non matching values are inserted', () => {
            request
                .get('/images?height=Tests&width=Test')
                .then((result) => {
                expect(result.status).toBe(200);
            });
        });
        it('should responde with a 404 error for a non existing images', () => {
            request
                .get('/images?filename=nonExistImage')
                .then((result) => {
                expect(result.status).toBe(404);
            });
        });
    });
    describe('testing error responses of image route', () => {
        it('should return an error when image is not found', () => {
            request
                .get('/images?filename=nonExistImage')
                .then((result) => {
                expect(result.text).toContain('We could not resize your image due to the following reason:');
            });
        });
    });
});
