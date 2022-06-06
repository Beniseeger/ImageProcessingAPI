import supertest from 'supertest';
import request from '../indexSpec';

describe('index route', () => {
  describe('testing status response of image route', () => {
    it('should return status 200 if all parameters are provided', () => {
      //Should return 400 because no parameters are provided
      request
        .get('/images?width=100&height=100&filename=fjord')
        .then((result: supertest.Response): void => {
          expect(result.status).toBe(200);
        });
    });

    it('should return status 400 for the initial image route', () => {
      //Should return 400 because no parameters are provided
      request.get('/images').then((result: supertest.Response): void => {
        expect(result.status).toBe(400);
      });
    });

    it('should return 400 if no valid input is provided', () => {
      request
        .get('/images?height=Tests&width=Test')
        .then((result: supertest.Response): void => {
          expect(result.status).toBe(400);
        });
    });

    it('should responde with a 404 error for a non existing images', () => {
      request
        .get('/images?width=100&height=100&filename=nonExistImage')
        .then((result: supertest.Response): void => {
          expect(result.status).toBe(404);
        });
    });
  });

  describe('testing error responses of image route', () => {
    it('should return an error when image is not found', (): void => {
      request
        .get('/images?width=100&height=100&filename=nonExistImage')
        .then((result: supertest.Response): void => {
          expect(result.text).toContain(
            'Please specify an image which exists in the full folder:'
          );
        });
    });
  });
});
