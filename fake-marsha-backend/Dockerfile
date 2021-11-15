FROM node:16-alpine

WORKDIR /app

# Separate npm install and copy of back files to use cache if no package update
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm ci --only=production

COPY . /app/

CMD ["npm", "run", "start"]
