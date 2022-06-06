import express from 'express';
import sharp from 'sharp';
import fileSystemOperations from '../../utilities/fileSystemOperations';

import validateInputParmeters from '../../middleware/validateImageInputMiddleware';

const images = express.Router();
images.use(validateInputParmeters);

interface RequestParameters {
  filename: string;
  width: number;
  height: number;
}

images.get('/', (req: express.Request, res: express.Response) => {
  sanitizingURLParameters(req.query).then(urlParameter => {
    if (typeof urlParameter === 'string') {
      res.status(404).send(urlParameter);
      return;
    }

    fileSystemOperations
      .getImageFromCache(urlParameter as RequestParameters)
      .then((cachedImage: Buffer | Error): void => {
        //Image exists and a chached one is returned.
        res.status(200).type('jpg').send(cachedImage);
      })
      .catch(() => {
        //Image does not yet exist and needs to be resized.
        resizeImage(urlParameter as RequestParameters).then(
          (image: Buffer | string): void => {
            //Check if an error was thrown during resizing
            if (typeof image === 'string') {
              res.status(404).send(image);
              return;
            }

            res.status(200).type('jpg').send(image);
          }
        );
      });
  });
});

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
    fileSystemOperations.getAbsolutePathForFile(urlParameter.filename, 'full')
  )
    .resize(urlParameter.width, urlParameter.height)
    .toFile(
      fileSystemOperations.getAbsolutePathForFile(
        `${urlParameter.filename}_${urlParameter.width}x${urlParameter.height}_thumps`,
        'converted'
      ),
      (error: Error) => {
        return `Error found while saving: ${error}`;
      }
    )
    .jpeg()
    .toBuffer()
    .then((data: Buffer) => {
      return data;
    })
    .catch((error: Error) => {
      return `Error found while resizing: ${error}`;
    });
}

/**
 * Returns object of the necessary url parameters
 * @param parameters the url parameters passed in by the user
 * @returns an object of necessary url parameters
 */
function sanitizingURLParameters(
  parameters: object
): Promise<RequestParameters | string> {
  //Check if the image exists
  return fileSystemOperations
    .doesFileExist(
      fileSystemOperations.getAbsolutePathForFile(
        (parameters as RequestParameters).filename as string,
        'full'
      )
    )
    .then((): string | RequestParameters => {
      const tmpFilename = (parameters as RequestParameters).filename as string;

      const tmpWidth = saveUnwrapURLParameterToNumber(
        (parameters as RequestParameters).width as unknown as string,
        'width'
      );
      const tmpHeight = saveUnwrapURLParameterToNumber(
        (parameters as RequestParameters).height as unknown as string,
        'height'
      );

      if (typeof tmpHeight === 'string' && typeof tmpWidth === 'string') {
        return (tmpHeight as string) + '<br>' + (tmpWidth as string);
      } else if (
        typeof tmpHeight === 'string' ||
        typeof tmpWidth === 'string'
      ) {
        return typeof tmpHeight === 'string'
          ? (tmpHeight as string)
          : (tmpWidth as string);
      }

      return {
        filename: tmpFilename,
        width: tmpWidth,
        height: tmpHeight,
      } as RequestParameters;
    })
    .catch((error): string => {
      return `Please specify an image which exists in the full folder: <br> ${error}`;
    });
}

/**
 * Save unwraps the provided url parameters to number
 * @param parameters the parameter which should be converted to number
 * @returns number from provided url parameter
 */

function saveUnwrapURLParameterToNumber(
  urlParameter: string,
  parameterName: string
): number | string {
  let tmpParameter: number;

  try {
    tmpParameter = parseInt(urlParameter);
    if (Number.isNaN(tmpParameter) || tmpParameter <= 0)
      return `Please enter a positive number for ${parameterName} greater than 0`;
  } catch (error) {
    return `Error while unwrapping ${parameterName}! Please enter a number as ${parameterName}: <br>${error}`;
  }

  return tmpParameter;
}

export default images;

//Export for testing purposes
export { sanitizingURLParameters, resizeImage };
