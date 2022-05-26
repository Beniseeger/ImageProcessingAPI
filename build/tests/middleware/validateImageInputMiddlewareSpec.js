"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validateImageInputMiddleware_1 = __importDefault(require("../../middleware/validateImageInputMiddleware"));
const mock_req_res_1 = require("mock-req-res");
describe('testing validate middleware', () => {
    const mkReponse = (0, mock_req_res_1.mockResponse)();
    const nextFunction = () => {
        console.log('Going to the next middleware');
    };
    it('should return a height error message when no height is provided', () => {
        const mockRequest = {
            query: {
                width: '100',
                filename: 'fjord',
            },
        };
        const logMessage = (0, validateImageInputMiddleware_1.default)(mockRequest, mkReponse, nextFunction);
        expect(logMessage).toMatch('Please specify a height for the image!');
    });
    it('should retrun a width error message when no width is provided', () => {
        const mockRequest = {
            query: {
                height: '100',
                filename: 'fjord',
            },
        };
        const logMessage = (0, validateImageInputMiddleware_1.default)(mockRequest, mkReponse, nextFunction);
        expect(logMessage).toMatch('Please specify a width for the image!');
    });
    it('should retrun a filename error message when no filename is provided', () => {
        const mockRequest = {
            query: {
                height: '100',
                width: '100',
            },
        };
        const logMessage = (0, validateImageInputMiddleware_1.default)(mockRequest, mkReponse, nextFunction);
        expect(logMessage).toMatch('Please specify an image which should be resized!');
    });
    it('should retrun No Error when all parameters are specified', () => {
        const mockRequest = {
            query: {
                height: '100',
                width: '100',
                filename: 'fjord',
            },
        };
        const logMessage = (0, validateImageInputMiddleware_1.default)(mockRequest, mkReponse, nextFunction);
        expect(logMessage).toMatch('No Error');
    });
});
