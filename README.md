# Image Processing API

## API route

The main route of the project is localhost:3000/images. If the route is called that way, the default image (fjord) with a height and width of 100 is returned to the user or a 404 error if that image is not found.
The files should be accessed without the file extension otherwise the image is not found.
During the whole development phase the visual studio prettier plugin was used instead of the command line version.

# Using the API

The image processing api expects the user to input the following parameters: filename, width, height. If no parameters are specified, a default image will be returned.
A sample URL would look as follows:
http://localhost:3000/images?width=100&height=100&filename=fjord

## Project structure

When building the project, all files will be compiled to the build folder. Use node ./build/. to start the server after building it.
The assets folder stores the original (full folder) and chached images (converted folder).
All tests are stored within the src/tests folder with the same strucutre as the server files.
The server files are separated into main server file (index.ts in top level) and route file (located in routes folder). When additional routes should be created it would simply create a new folder under routes.

## Starting scripts

The project uses the following scripts:

- Start via nodemon: npm run start
- Use prettier: npm run prettier
- Use eslint: npm run lint
- Build the project: npm run build
- Start the server after build: node ./build/.
- Use jasmine only: npm run jasmine
- Use build + jasmine (preffered): npm run test

## Version Control

During this project git was used in a local repository.

## Resubmitting project

The following things were changed:

- Dependencies should only include necessary once: -> All unnecessary dependencies were moved to the devDependencies section
- Provide instruction in the readme.md on how to start the app: -> in the section using the api a startup section with the necessary parameters was included
- Check wether the provided url paramters are valid: -> A middleware was created which checks the url parameter for the /images route
- Missing type information: -> The missing types were added.
- Url parameter sanatizing was implemented
