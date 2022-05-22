import { resolve } from 'path';
import {
  doesImageExist,
  getAbsolutePathForImage,
  resizeImage,
  saveUnwrappURLParameters,
} from '../../../routes/images/images';

describe('image module testing', () => {
  it('should return the default urlParameters', () => {
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

  it('should return an error for non existing images', () => {
    resizeImage({
      filename: 'nonExistingImage',
      fileType: '.jpg',
      height: 100,
      width: 100,
    }).then(result => {
      expect(result).toContain('Error found while resizing: ');
    });
  });

  it('should return an image when image exists', () => {
    //saveImageToThumb()

    doesImageExist({
      filename: 'fjord',
      fileType: '.jpg',
      height: 100,
      width: 100,
    }).then((result: Buffer) => {
      expect(result).toBeInstanceOf(Buffer);
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

  it('should return an absolute path for fjord image', () => {
    const path = getAbsolutePathForImage('fjord', '.jpg', 'full');

    expect(path).toEqual(resolve('assets/full/fjord.jpg'));
  });
});
