import app from '../../index';
import supertest, { SuperTest } from 'supertest';

const request = supertest(app);

describe('testing image route', () => {
  describe('testing status response of image route', () => {
    it('should return status 200 for the initial image route', () => {
      request.get('/images').then((result: supertest.Response): void => {
        expect(result.status).toBe(200);
      });
    });

    it('should use the default values and return 200 when non matching values are inserted', () => {
      request
        .get('/images?height=Tests&width=Test')
        .then((result: supertest.Response): void => {
          expect(result.status).toBe(200);
        });
    });

    it('should responde with a 404 error for a non existing images', () => {
      request
        .get('/images?filename=nonExistImage')
        .then((result: supertest.Response): void => {
          expect(result.status).toBe(404);
        });
    });
  });

  describe('testing error responses of image route', () => {
    it('should return an error when image is not found', () => {
      request
        .get('/images?filename=nonExistImage')
        .then((result: supertest.Response): void => {
          expect(result.text).toContain('Error found while');
        });
    });
  });
});
