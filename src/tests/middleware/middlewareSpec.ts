import middleware from '../../middleware/middleware';
import { Request, Response } from 'express';

describe('testing middleware', (): void => {
  const mockRequest: Partial<Request> = { url: '/api' };
  let mockResponse: Partial<Response>;

  it('should log an entry for /api', (): void => {
    const logMessage = middleware(
      mockRequest as Request,
      mockResponse as Response,
      () => {
        console.log('Going to the next middleware');
      }
    );
    expect(logMessage).toMatch('The endpoint: /api has been accessed');
  });
});
