## Stage 0, "build": based on Node.js, to build and compile the frontend
FROM node:16-alpine as build

WORKDIR /app

# Separate npm install and npm build to make the best of Docker cache
COPY package.json /app/package.json
RUN npm install

COPY . /app/

## Stage 1: based on the official nginx image, serves the static frontend files
FROM nginx:1.21

COPY --from=build /app/build /var/www/jitsi-box

COPY ./nginx-jitsi-box.conf /etc/nginx/conf.d/nginx-jitsi-box.conf
