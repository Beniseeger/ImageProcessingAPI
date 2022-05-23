# Image Processing API

## API route

The main route of the project is localhost:3000/images. If the route is called that way, the default image (fjord) with a height and width of 100 is returned to the user or a 404 error if that image is not found.
The files should be accessed without the file extension otherwise the image is not found.
During the whole development phase the visual studio prettier plugin was used instead of the command line version.

Becasue the node modules are not commited, please run npm install before using the project.

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

During this project git was used in a local and now remote repository.
