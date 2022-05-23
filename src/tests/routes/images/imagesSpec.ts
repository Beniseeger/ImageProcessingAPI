import { resolve } from 'path';
import {
  doesImageExist,
  getAbsolutePathForImage,
  resizeImage,
  saveUnwrappURLParameters,
} from '../../../routes/images/images';

describe('image module testing', (): void => {
  it('should return the default urlParameters', (): void => {
    const defaultParameters = saveUnwrappURLParameters({
      height: 'test',
      width: 'daisoj',
    });

    expect(defaultParameters).toEqual({
      filename: 'fjord',
      fileType: '.jpg',
      height: 100,
      width: 100,
    });
  });

  it('should return an error for non existing images', (): void => {
    resizeImage({
      filename: 'nonExistingImage',
      fileType: '.jpg',
      height: 100,
      width: 100,
    }).then((result: Buffer | string): void => {
      expect(result).toContain(
        'We could not resize your image due to the following reason:'
      );
    });
  });

  it('should return a cached image when image exists', (): void => {
    resizeImage({
      filename: 'fjord',
      fileType: '.jpg',
      height: 100,
      width: 100,
    }).then((): void => {
      doesImageExist({
        filename: 'fjord',
        fileType: '.jpg',
        height: 100,
        width: 100,
      })
        .then((result: Buffer | Error): void => {
          expect(result).toBeInstanceOf(Buffer);
        })
        .catch((): void => {
          //Error would be thrown if a image does not exists
          expect(true).toBeFalse();
        });
    });
  });

  it('should return an error when image does not exist', async () => {
    await expectAsync(
      doesImageExist({
        filename: 'nonExistingImage',
        fileType: '.jpg',
        height: 100,
        width: 100,
      })
    ).toBeRejectedWithError();
  });

  it('should return an absolute path for fjord image', (): void => {
    const path = getAbsolutePathForImage('fjord', '.jpg', 'full');

    expect(path).toEqual(resolve('assets/full/fjord.jpg'));
  });
});
