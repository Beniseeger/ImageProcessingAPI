"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_1 = __importDefault(require("../../middleware/middleware"));
describe('testing middleware', () => {
    const mockRequest = { url: '/api' };
    let mockResponse;
    it('should log an entry for /api', () => {
        const logMessage = middleware_1.default.loggerMiddleware(mockRequest, mockResponse, () => {
            console.log('Going to the next middleware');
        });
        expect(logMessage).toMatch('The endpoint: /api has been accessed');
    });
    it('should retrun an error when not specifying height', () => {
        const logMessage = middleware_1.default.validateInputParmeters(mockRequest, mockResponse, () => {
            console.log('Going to the next middleware');
        });
        expect(logMessage).toMatch('Error');
    });
});
