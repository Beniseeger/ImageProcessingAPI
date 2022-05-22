"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_1 = __importDefault(require("../../middleware/middleware"));
describe('testing middleware', () => {
    let mockRequest = { url: '/api' };
    let mockResponse;
    it('should log an entry for /api', () => {
        //console.log = jasmine.createSpy('log');
        const logMessage = middleware_1.default.loggerMiddleware(mockRequest, mockResponse, () => { });
        expect(logMessage).toMatch('The endpoint: /api has been accessed');
    });
});
