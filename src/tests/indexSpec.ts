import app from '../index';
import supertest, { SuperTest } from 'supertest';

const request = supertest(app);

describe('testing main endpoint', () => {
  it('should return status 200', () => {
    request.get('/').then((result: supertest.Response): void => {
      expect(result.status).toBe(200);
    });
  });

  it('should return 404 for unknown routes', () => {
    request.get('/unknown').then((result: supertest.Response): void => {
      expect(result.status).toBe(404);
    });
  });
});
