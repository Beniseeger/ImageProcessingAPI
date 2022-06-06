import { promises as fs } from 'fs';
import { resolve } from 'path';

interface RequestParameters {
  filename: string;
  width: number;
  height: number;
}

/**
 * Returns an image as buffer if it exists or an error if it doesnt.
 *
 * @params urlParameters: the image to be looked out for.
 * @returns Buffer or Error if image exists or not
 */
function getImageFromCache(
  urlParameter: RequestParameters
): Promise<Buffer | Error> {
  return fs.readFile(
    getAbsolutePathForFile(
      `${urlParameter.filename}_${urlParameter.width}x${urlParameter.height}_thumps`,
      'converted'
    )
  );
}

/**
 * Returns an absolute Path for a given image name
 *
 * @param imageName name of the image which will be looked after
 * @param imageType image type
 * @param topFolder top level folder where the image is located.
 * @returns
 */
function getAbsolutePathForFile(filename: string, topFolder: string): string {
  return resolve(`assets/${topFolder}/${filename}`);
}

function doesFileExist(filepath: string): Promise<void> {
  return fs.access(filepath);
}

export default {
  getImageFromCache,
  getAbsolutePathForFile,
  doesFileExist,
};
