## Stage 0, "build": based on Node.js, to build and compile the frontend
FROM node:17-alpine as build

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
    apt install software-properties-common &&\
    add-apt-repository ppa:certbot/certbot && \
    apt update && \
    apt install certbot

# Setup certbot renew pre and post hooks
RUN echo -e '\
    echo "stopping service nginx"\n\
    systemctl stop nginx'\
    > /etc/letsencrypt/renewal-hooks/pre/stop_services && \
    echo -e '\
    echo "starting service nginx"\n\
    systemctl start nginx'\
    > /etc/letsencrypt/renewal-hooks/post/start_services

# Arguments for certbot
ARG deploy_user=jitsi
ARG certbot_email=test@gmail.com
ARG domain=jitsi-box.cs-campus.fr
ARG front_files=/var/www/build

# Copy Nginx conf file
COPY ./nginx-jitsi-box.conf.template /etc/nginx/conf.d/nginx-jitsi-box.conf

# Replace domain name variable in nginx template with its real value
RUN sed -i "s/{{ domain_name }}/${domain}/g" /etc/nginx/conf.d/nginx-jitsi-box.conf && \
    sed -i "s/{{ path/to/front/files }}/${front_files}/g" /etc/nginx/conf.d/nginx-jitsi-box.conf

# Create deploy_user
RUN useradd -s /bin/bash ${deploy_user}
USER ${deploy_user}

# Copy front files
COPY --from=build /app/build /var/www/jitsi-box

# Create first certs
RUN certbot certonly --standalone --noninteractive --agree-tos --email ${certbot_email} \
    -d ${domain} --pre-hook /etc/letsencrypt/renewal-hooks/pre/stop_services \
    --post-hook /etc/letsencrypt/renewal-hooks/post/start_services

# Add renew to deploy_user crontab
RUN crontab -l |\
    { cat; echo '30 3 * * * certbot renew --quiet --renew-hook "systemctl restart nginx"'; } |\
    crontab -
