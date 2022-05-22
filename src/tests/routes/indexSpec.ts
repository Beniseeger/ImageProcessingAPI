import app from '../../routes/index';
import supertest, { SuperTest } from 'supertest';

const request = supertest(app);

xdescribe('endpoint testing', () => {
  /*beforeAll(() => {
    app.listen(5000, () => {
      console.log(`Server has started and is listening on localhost: 5000`);
    });
  });*/

  describe('status endpoint testing', () => {
    it('should return status 200', () => {
      request.get('/images').then((result: supertest.Response): void => {
        expect(result.status).toBe(200);
      });
    });

    //Delte it or compare to image
    it('should return the default image', () => {
      request.get('/images').then((result: supertest.Response): void => {
        expect(result.status).toBe(200);
      });
    });

    it('should return 200 when non matching values are inserted', () => {
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

  /*afterAll(() => {
    app
      .listen(3000, () => {
        console.log(`Server has started and is listening on localhost: 3000`);
      })
      .close();
  });*/
});
