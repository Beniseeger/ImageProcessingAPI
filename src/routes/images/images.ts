import { rejects } from 'assert';
import express from 'express';
import path from 'path';
import sharp from 'sharp';
//import {promises as fs} from fs;

const images = express.Router();

interface RequestParameters {
  filename: string;
  width?: number;
  height?: number;
}

images.get('/', (req, res) => {
  console.log(req.query);
  const urlParameter = saveUnwrappURLParameters(req.query);

  resizeImage(urlParameter).then(data => {
    console.log('data: ', typeof data);

    if (typeof data === 'string') {
      console.error(data);
      res.status(404).send(data);
      return;
    }

    res.status(200).type('jpg').send(data);
  });
});

/*function sendResizedFileToUser(bufferImage: Buffer): never {
  const base64Data = data.toString('base64');

  
}*/

//Missing return parameter
async function resizeImage(
  urlParameters: RequestParameters
): Promise<Buffer | string> {
  return await sharp(
    `/Users/beni/Udacity/Projekte/Image_Api/src/assets/full/${urlParameters.filename}`
  )
    .resize(urlParameters.width, urlParameters.height)
    .jpeg()
    .toBuffer()
    .then(data => {
      console.log('returnd with: ', data);
      return data;
    })
    .catch(error => {
      return `Error found: ${error}`;
    });
}

function saveUnwrappURLParameters(parameters: object): RequestParameters {
  //let resultParameterObject: RequestParameters;

  try {
    return {
      filename: (parameters as RequestParameters).filename,
      width: Number((parameters as RequestParameters).width),
      height: Number((parameters as RequestParameters).height),
    } as RequestParameters;
  } catch (err) {
    console.log(`Error: ${err}`);
    return { filename: 'test', width: 1, height: 1 } as RequestParameters;
  }
}

export default images;
