# How To Build

Once you have [npm installed](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), open a terminal in the project directory.

## To run locally:

### `npm install` to download and install all packages

### `npm start` to compile and start development server

In `\src\logic\apiRequest.tsx`, check that `const url` is set to `'http://localhost:8080/v1/graphql'` and not the development server. This requires the backend to also be running.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

## Running Storybook:

### `npm run storybook` to run the Storybook page

Runs on [http://localhost:6006](http://localhost:6006).

