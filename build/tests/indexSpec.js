"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../index"));
const supertest_1 = __importDefault(require("supertest"));
const request = (0, supertest_1.default)(index_1.default);
describe('testing main endpoint', () => {
    it('should return status 200', () => {
        request.get('/').then((result) => {
            expect(result.status).toBe(200);
        });
    });
    it('should return 404 for unknown routes', () => {
        request.get('/unknown').then((result) => {
            expect(result.status).toBe(404);
        });
    });
});
exports.default = request;
