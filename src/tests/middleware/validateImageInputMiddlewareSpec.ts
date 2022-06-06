import validateInputParmeters from '../../middleware/validateImageInputMiddleware';
import { Request } from 'express';
import { mockResponse } from 'mock-req-res';

describe('testing validate middleware', (): void => {
  const mkReponse = mockResponse();

  const nextFunction = (): void => {
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
    expect(logMessage).toMatch(
      'Error: please specify a width and height for the api.'
    );
  });

  it('should retrun a width error message when width is provided wrong', (): void => {
    const mockRequest = {
      query: {
        width: 'hdash',
        height: '100',
        filename: 'fjord',
      },
    } as Partial<Request>;

    const logMessage = validateInputParmeters(
      mockRequest as Request,
      mkReponse,
      nextFunction
    );
    expect(logMessage).toMatch(
      'Error: Please enter a positive number for the width of the image!'
    );
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
      'Error: Please specify an image by the parameter filename which should be resized!'
    );
  });

  it('should return No Error when all parameters are specified', (): void => {
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
