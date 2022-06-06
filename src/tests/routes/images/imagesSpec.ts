import {
  resizeImage,
  sanitizingURLParameters,
} from '../../../routes/images/images';

interface RequestParameters {
  filename: string;
  width: number;
  height: number;
}

describe('testing image module', (): void => {
  it('should throw an error when image does not exist', (): void => {
    sanitizingURLParameters({
      filename: 'undefined',
      height: 'test',
      width: '100',
    })
      .then((urlParameter: string | RequestParameters) => {
        expect(urlParameter).toContain(
          'Please specify an image which exists in the full folder:'
        );
      })
      .catch((): void => {
        //Error would be thrown if a image does not exists
        expect(true).toBeFalse();
      });
  });

  it('should throw an error for non positive height numbers', (): void => {
    sanitizingURLParameters({
      filename: 'fjord.jpg',
      height: 'test',
      width: '100',
    })
      .then((urlParameter: string | RequestParameters) => {
        expect(urlParameter).toContain(
          'Please enter a positive number for height greater than 0'
        );
      })
      .catch((): void => {
        //Error would be thrown if a image does not exists
        expect(true).toBeFalse();
      });
  });

  it('should throw an error for non positive width numbers', (): void => {
    sanitizingURLParameters({
      filename: 'fjord.jpg',
      height: '100',
      width: 'test',
    })
      .then((urlParameter: string | RequestParameters) => {
        expect(urlParameter).toContain(
          'Please enter a positive number for width greater than 0'
        );
      })
      .catch((): void => {
        //Error would be thrown if a image does not exists
        expect(true).toBeFalse();
      });
  });

  it('should throw an error for non existing height / width', (): void => {
    sanitizingURLParameters({
      filename: 'fjord.jpg',
      height: '100',
      width: 'test',
    })
      .then((urlParameter: string | RequestParameters) => {
        expect(urlParameter).toContain(
          'Please enter a positive number for width greater than 0'
        );
      })
      .catch((): void => {
        //Error would be thrown if a image does not exists
        expect(true).toBeFalse();
      });
  });

  it('should return an error for non existing images', (): void => {
    resizeImage({
      filename: 'nonExistingImage',
      height: 100,
      width: 100,
    }).then((result: Buffer | string): void => {
      expect(result).toContain(
        'Error found while resizing: Error: Input file is missing: '
      );
    });
  });
});
