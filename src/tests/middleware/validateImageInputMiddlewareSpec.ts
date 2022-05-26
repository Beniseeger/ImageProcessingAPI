import validateInputParmeters from '../../middleware/validateImageInputMiddleware';
import { Request, Response } from 'express';
import { mockResponse } from 'mock-req-res';

describe('testing validate middleware', (): void => {
  const mkReponse = mockResponse();

  const nextFunction = () => {
    console.log('Going to the next middleware');
  };

  it('should return a height error message when no height is provided', (): void => {
    const mockRequest = {
      query: {
        width: '100',
        filename: 'fjord',
      },
    } as Partial<Request>;

    const logMessage = validateInputParmeters(
      mockRequest as Request,
      mkReponse,
      nextFunction
    );
    expect(logMessage).toMatch('Please specify a height for the image!');
  });

  it('should retrun a width error message when no width is provided', (): void => {
    const mockRequest = {
      query: {
        height: '100',
        filename: 'fjord',
      },
    } as Partial<Request>;

    const logMessage = validateInputParmeters(
      mockRequest as Request,
      mkReponse,
      nextFunction
    );
    expect(logMessage).toMatch('Please specify a width for the image!');
  });

  it('should retrun a filename error message when no filename is provided', (): void => {
    const mockRequest = {
      query: {
        height: '100',
        width: '100',
      },
    } as Partial<Request>;

    const logMessage = validateInputParmeters(
      mockRequest as Request,
      mkReponse,
      nextFunction
    );
    expect(logMessage).toMatch(
      'Please specify an image which should be resized!'
    );
  });

  it('should retrun No Error when all parameters are specified', (): void => {
    const mockRequest = {
      query: {
        height: '100',
        width: '100',
        filename: 'fjord',
      },
    } as Partial<Request>;

    const logMessage = validateInputParmeters(
      mockRequest as Request,
      mkReponse,
      nextFunction
    );
    expect(logMessage).toMatch('No Error');
  });
});
