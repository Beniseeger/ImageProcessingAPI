import { resolve } from 'path';
import fileSystemOperations from '../../utilities/fileSystemOperations';

describe('testing the file system utilities', () => {
  it('should return a cached image when image exists', (): void => {
    fileSystemOperations
      .getImageFromCache({
        filename: 'fjord.jpg',
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

  it('should return an error when image does not exist', async (): Promise<void> => {
    await expectAsync(
      fileSystemOperations.getImageFromCache({
        filename: 'nonExistingImage',
        height: 100,
        width: 100,
      })
    ).toBeRejectedWithError();
  });

  it('should return an absolute path for fjord image', (): void => {
    const path = fileSystemOperations.getAbsolutePathForFile(
      'fjord.jpg',
      'full'
    );

    expect(path).toEqual(resolve('assets/full/fjord.jpg'));
  });

  it('should not catch an error if a file exists in full folder', (): void => {
    fileSystemOperations
      .doesFileExist(
        fileSystemOperations.getAbsolutePathForFile('fjord.jpg', 'full')
      )
      .then((): void => {
        expect(true).toBeTrue();
      })
      .catch((): void => {
        expect(true).toBeFalse();
      });
  });

  it('should catch an error if a file does not exists in full folder', (): void => {
    fileSystemOperations
      .doesFileExist(
        fileSystemOperations.getAbsolutePathForFile('UnknownFile.jpg', 'full')
      )
      .then((): void => {
        expect(true).toBeFalse();
      })
      .catch((): void => {
        expect(true).toBeTrue();
      });
  });
});
