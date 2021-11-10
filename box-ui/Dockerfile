## Stage 0, "build": based on Node.js, to build and compile the frontend
FROM node:16-alpine as build

WORKDIR /app

# Separate npm install and npm build to make the best of Docker cache
COPY package.json /app/package.json
RUN npm install

COPY . /app/

RUN npm run build

## Stage 1: based on the official nginx image, serves the static frontend files
FROM nginx:1.21

# Install certbot for certificate auto renew
RUN apt update &&\
    apt install -y software-properties-common &&\
    add-apt-repository -r ppa:certbot/certbot && \
    apt update && \
    apt install -y certbot

# Setup certbot renew pre and post hooks
RUN mkdir /etc/letsencrypt/renewal-hooks &&\
    mkdir /etc/letsencrypt/renewal-hooks/pre &&\
    mkdir /etc/letsencrypt/renewal-hooks/post &&\
    chmod -R 755 /etc/letsencrypt/renewal-hooks &&\
    echo "echo 'stopping service nginx for certificate renewal'\nsystemctl stop nginx"\
    > /etc/letsencrypt/renewal-hooks/pre/stop_services &&\
    echo "echo 'starting service nginx after certificate renewal'\nsystemctl start nginx"\
    > /etc/letsencrypt/renewal-hooks/post/start_services &&\
    chmod 750 /etc/letsencrypt/renewal-hooks/pre/stop_services &&\
    chmod 750 /etc/letsencrypt/renewal-hooks/post/start_services

# Arguments for certbot
ARG certbot_email=test@gmail.com
ARG domain=jitsi-box.cs-campus.fr
ARG front_files=/var/www/jitsi-box/box-ui

# Copy Nginx conf file
COPY ./nginx-jitsi-box.conf.template /etc/nginx/conf.d/nginx-jitsi-box.conf

# Replace domain name variable in nginx template with its real value
RUN sed -i "s|{{ domain_name }}|${domain}|g" /etc/nginx/conf.d/nginx-jitsi-box.conf && \
    sed -i "s|{{ path/to/front/files }}|${front_files}|g" /etc/nginx/conf.d/nginx-jitsi-box.conf

# Copy front files
COPY --from=build /app/build ${front_files}

# Create first certs
RUN certbot certonly --standalone --noninteractive --agree-tos --email ${certbot_email} \
    -d ${domain} --pre-hook /etc/letsencrypt/renewal-hooks/pre/stop_services \
    --post-hook /etc/letsencrypt/renewal-hooks/post/start_services

# Add renew to deploy_user crontab
RUN crontab -l |\
    { cat; echo '30 3 * * * certbot renew --quiet --renew-hook "systemctl restart nginx"'; } |\
    crontab -
