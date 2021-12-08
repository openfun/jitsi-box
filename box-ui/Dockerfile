## Stage 0, "build": based on Node.js, to build and compile the frontend
FROM node:16-alpine as build

WORKDIR /app

# Separate npm install and npm build to make the best of Docker cache
COPY package.json /app/package.json
# Legacy peer deps for the QR code scanner
RUN npm install --legacy-peer-deps

COPY . /app/

RUN npm run build

## Stage 1: based on the official nginx image, serves the static frontend files
FROM nginx:1.21

# Install certbot for certificate auto renew
#RUN apt update &&\
#    apt install -y software-properties-common &&\
#    add-apt-repository -r ppa:certbot/certbot && \
#    apt update && \
#    apt install -y certbot python3-certbot-nginx

# ARG are defined only in build
#ARG certbot_email=test@gmail.com
ARG domain
ARG front_files

# ENV are accessible after build (when certbot CMD will be launched)
#ENV certbot_email=${certbot_email}
#ENV domain=${domain}

# Copy Nginx conf file
#COPY ./nginx-jitsi-box.conf.template /etc/nginx/conf.d/nginx-jitsi-box.conf

# Replace domain name variable in nginx template with its real value
#RUN sed -i "s|{{ domain_name }}|${domain}|g" /etc/nginx/conf.d/nginx-jitsi-box.conf && \
#    sed -i "s|{{ path/to/front/files }}|${front_files}|g" /etc/nginx/conf.d/nginx-jitsi-box.conf

# Copy front files
COPY --from=build /app/build ${front_files}

# Run certbot
#CMD certbot --noninteractive --agree-tos --email ${certbot_email} -d ${domain} --redirect --nginx

