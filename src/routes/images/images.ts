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
    .then((data: Buffer) => {
      res.status(200).type(urlParameter.fileType).send(data);
    })
    .catch(() => {
      //Image does not yet exist
      resizeImage(urlParameter).then((data): void => {
        console.log('data: ', typeof data);

        if (typeof data === 'string') {
          res.status(404).send(data);
          return;
        }

        res.status(200).type(urlParameter.fileType).send(data);
      });
    });
});

function getAbsolutePathForImage(
  imageName: string,
  imageType: string,
  topFolder: string
): string {
  return resolve(`assets/${topFolder}/${imageName}${imageType}`);
}

function doesImageExist(urlParameter: RequestParameters): Promise<Buffer> {
  //fs.readdir(getAbsolutePathForImage(`${urlParameter.filename}_${urlParameter.width}x${urlParameter.height}_thumps.jpg`, 'converted'))

  return fs.readFile(
    getAbsolutePathForImage(
      `${urlParameter.filename}_${urlParameter.width}x${urlParameter.height}_thumps.jpg`,
      urlParameter.fileType,
      'converted'
    )
  );
}

//Missing return parameter
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
        `${urlParameter.filename}_${urlParameter.width}x${urlParameter.height}_thumps.jpg`,
        urlParameter.fileType,
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

export {
  saveUnwrappURLParameters,
  resizeImage,
  doesImageExist,
  getAbsolutePathForImage,
};
