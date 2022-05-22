import middleware from '../../middleware/middleware';
import { NextFunction, Request, Response } from 'express';

describe('testing middleware', (): void => {
  let mockRequest: Partial<Request> = { url: '/api' };
  let mockResponse: Partial<Response>;

  it('should log an entry for /api', (): void => {
    //console.log = jasmine.createSpy('log');
    const logMessage = middleware.loggerMiddleware(
      mockRequest as Request,
      mockResponse as Response,
      () => {}
    );
    expect(logMessage).toMatch('The endpoint: /api has been accessed');
  });
});
