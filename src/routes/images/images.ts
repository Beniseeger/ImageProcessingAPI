import express from 'express';
import sharp from 'sharp';
import { promises as fs } from 'fs';
import { resolve } from 'path';

const images = express.Router();

interface RequestParameters {
  filename: string;
  fileType: string;
  width: number;
  height: number;
}

images.get('/', (req: express.Request, res: express.Response) => {
  const urlParameter = saveUnwrappURLParameters(req.query);

  doesImageExist(urlParameter)
    .then((cachedImage: Buffer | Error): void => {
      //Image exists and a chached one is returned.
      res.status(200).type(urlParameter.fileType).send(cachedImage);
    })
    .catch(() => {
      //Image does not yet exist and needs to be resized.
      resizeImage(urlParameter).then(
        (resizingResult: Buffer | string): void => {
          //Check if an error was thrown during resizing
          if (typeof resizingResult === 'string') {
            res.status(404).send(resizingResult);
            return;
          }

          res.status(200).type(urlParameter.fileType).send(resizingResult);
        }
      );
    });
});

/**
 * Returns an absolute Path for a given image name
 *
 * @param imageName name of the image which will be looked after.
 * @param imageType image type.
 * @param topFolder top level folder where the image is located.
 * @returns
 */
function getAbsolutePathForImage(
  imageName: string,
  imageType: string,
  topFolder: string
): string {
  return resolve(`assets/${topFolder}/${imageName}${imageType}`);
}

/**
 * Returns an image as buffer if it exists or an error if it doesnt.
 *
 * @params urlParameters: the image to be looked out for.
 * @returns Buffer or Error if image exists or not
 */
function doesImageExist(
  urlParameter: RequestParameters
): Promise<Buffer | Error> {
  return fs.readFile(
    getAbsolutePathForImage(
      `${urlParameter.filename}_${urlParameter.width}x${urlParameter.height}_thumps`,
      urlParameter.fileType,
      'converted'
    )
  );
}

/**
 * Returns a resized image and saves it to the converted folder.
 *
 * @param urlParameter the image, width and height which should be resized.
 * @returns a resized image if it exists or throws an error.
 */
function resizeImage(
  urlParameter: RequestParameters
): Promise<Buffer | string> {
  return sharp(
    getAbsolutePathForImage(
      urlParameter.filename,
      urlParameter.fileType,
      'full'
    )
  )
    .resize(urlParameter.width, urlParameter.height)
    .toFile(
      getAbsolutePathForImage(
        `${urlParameter.filename}_${urlParameter.width}x${urlParameter.height}_thumps`,
        urlParameter.fileType,
        'converted'
      ),
      (error: Error) => {
        return `We could not save your image to the cache due to the following reason: \n${error}`;
      }
    )
    .jpeg()
    .toBuffer()
    .then((data: Buffer) => {
      return data;
    })
    .catch((error: Error) => {
      return `We could not resize your image due to the following reason: \n${error}`;
    });
}

/**
 * Returns object of the necessary url parameters
 * @param parameters the url parameters passed in by the user
 * @returns an object of necessary url parameters
 */
function saveUnwrappURLParameters(parameters: object): RequestParameters {
  return {
    filename: ((parameters as RequestParameters).filename as string)
      ? ((parameters as RequestParameters).filename as string)
      : 'fjord',
    fileType: '.jpg',
    width: Number((parameters as RequestParameters).width)
      ? Number((parameters as RequestParameters).width)
      : 100,
    height: Number((parameters as RequestParameters).height)
      ? Number((parameters as RequestParameters).height)
      : 100,
  } as RequestParameters;
}

export default images;

//Export for testing purposes
export {
  saveUnwrappURLParameters,
  resizeImage,
  doesImageExist,
  getAbsolutePathForImage,
};
