import app from '../index';
import supertest from 'supertest';

const request = supertest(app);

describe('testing main endpoint', () => {
  it('should return status 200', (): void => {
    request.get('/').then((result: supertest.Response): void => {
      expect(result.status).toBe(200);
    });
  });

  it('should return 404 for unknown routes', (): void => {
    request.get('/unknown').then((result: supertest.Response): void => {
      expect(result.status).toBe(404);
    });
  });
});

export default request;
