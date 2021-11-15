FROM node:16-alpine

WORKDIR /app

# Separate npm install and copy of back files to use cache if no package update
COPY package.json /app/package.json

RUN npm install

COPY . /app/

CMD ["node", "app.js"]
