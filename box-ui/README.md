# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start` / `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `npm run lint`

Launch the `eslint` linter with the `-fix` option: it will correct as much linter errors as it can, and the remaining ones must be fixed by yourself.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# Deployment

This web app is intendend to be deployed on a server to be served by a web server.\
Since there is no backend, the static files can also be put on a CDN, or hosted on any Cloud Provider for fewer costs (deploying a new bare machine just for one webiste is completely overkilled).

## `.env` file

You must create a `.env` file (copy the `.env.template`), and fill it with the correct values.

Env variables starting with `REACT_APP_` are automatically catched by react, so we do not need the `dotenv` package.

At the moment 7 variables are used :

-   `REACT_APP_MARSHA_URL` that set marsha's address
-   `REACT_APP_POLICY_ADDRESS` that should be set to `[policy server | http://localhost:8070]/policy?custom_address=${roomName}` if you need to upload pictures on different servers (depending on the meeting for instance) otherwise you just need to go on /policy
-   `REACT_APP_TIME_BETWEEN_PICTURES` defines the time between two pictures sent to backend server
-   `REACT_APP_ORIGINAL_PHOTO` defines the address to get the image not processed
-   `REACT_APP_PHOTO` defines the address to get the image of the image processed
-   `REACT_APP_WS_ADDRESS` defines the address used for Websocket commmunication
-   `REACT_APP_COORD` defines the address to post the coordinates used for cropping the image

## Dockerfile

```Dockerfile
## Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:16-alpine as build

WORKDIR /app

# Separate npm install and npm build to make the best of Docker cache
COPY package.json /app/package.json
RUN npm install

COPY . /app/
RUN cp src/config.js.template src/config.js && \
    npm run build
```

The first part of the Dockerfile builds the frontend static files, from a node alpine image.

```Dockerfile
## Stage 1: based on the official nginx image, serves the static frontend files
FROM nginx:1.21

# ARG are defined only in build
ARG front_files

# Copy front files
COPY --from=build /app/build ${front_files}
```

The second part of the Dockerfile copy the builded files inside the official Nginx docker image. The Nginx configuration file is managed by the [docker-compose](../staging/docker-compose.yml).

## Run the app

`docker-compose up`
