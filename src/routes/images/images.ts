import express from 'express';
import sharp from 'sharp';
import { promises as fs } from 'fs';
import { resolve } from 'path';

const images = express.Router();

interface RequestParameters {
  filename: string;
  fileType: string;
  width?: number;
  height?: number;
}

images.get('/', (req, res) => {
  console.log(req.query);
  const urlParameter = saveUnwrappURLParameters(req.query);

  const imageExists = doesImageExist(urlParameter)
    .then(data => {
      sendResizedImageResponse(data, 'jpg', res);
    })
    .catch(() => {
      //Image does not yet exist
      resizeImage(urlParameter).then((data): void => {
        console.log('data: ', typeof data);

        if (typeof data === 'string') {
          res.status(404).send(data);
          return;
        }

        saveImageToThumb(data, urlParameter).then(() =>
          sendResizedImageResponse(data, 'jpg', res)
        );
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

function sendResizedImageResponse(
  image: Buffer,
  imageType: string,
  res: express.Response
): void {
  res.status(200).type(imageType).send(image);
}

function saveImageToThumb(
  image: Buffer,
  urlParameter: RequestParameters
): Promise<void> {
  return fs.writeFile(
    getAbsolutePathForImage(
      `${urlParameter.filename}_${urlParameter.width}x${urlParameter.height}_thumps.jpg`,
      urlParameter.fileType,
      'converted'
    ),
    image
  );
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
async function resizeImage(
  urlParameter: RequestParameters
): Promise<Buffer | string> {
  return await sharp(
    getAbsolutePathForImage(
      urlParameter.filename,
      urlParameter.fileType,
      'full'
    )
  )
    .resize(urlParameter.width, urlParameter.height)
    .jpeg()
    .toBuffer()
    .then(data => {
      return data;
    })
    .catch(error => {
      return `Error found while resizing: ${error}`;
    });
}

function saveUnwrappURLParameters(parameters: object): RequestParameters {
  return {
    filename: (parameters as RequestParameters).filename
      ? (parameters as RequestParameters).filename
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
