# Development

To ease development, you can use the files in this folder to deploy a full instance on a VM or a server.

# Folder structure

## Marsha mimicking
To be able to connect to Marsha to retrieve a Jitsi link, we mock the Marsha API by launching a tiny Node JS app, with a unique route `(POST) /marsha/login`. It expects a body with a `code` entry. 

For more details, check the associated [README](./fake-marsha-backend/README.md).

## docker-compose
We define 3 services in the [docker-compose](./docker-compose.yml) file:
- the [web server container](../box-ui/README.md), based on the `Nginx` official image, listening on ports `80` and `443` and serving the static frontend files
- the [certbot container](https://hub.docker.com/r/certbot/certbot), used to generate the SSL certificates
- the [marsha-mimicking backend container](##Marsha-mimicking), used to retrieve a Jitsi room link

The `Nginx` container looks for its configuration in a [conf folder](./docker-data/nginx-conf), and shares two other folders with the `Certbot` container, where the SSL certificates are stored.

## docker-data
Here are stored the `Nginx` configuration and the SSL certificates. The certs are not added to the git repository for security reasons.

Unfortunately, this has a drawback: we cannot simply launch the `docker-compose up` command, as the `Nginx` container will fail because of the missing certificates. We therefore need to use the [init-letsencrypt.sh](./init-letsencrypt.sh) script.

## init-letsencrypt.sh
This script gets recommended TLS parameters, generates dummy certificates, launches the `Nginx` container (which does not fail anymore because of the presence of the dummy certs), delete these dummy certs and use the `Certbot` image to generate the good certificates.

# Deploying

## Setup
Pull the code on your server
```bash
git clone https://github.com/openfun/jitsi-box.git
cd jitsi-box
```

Populate the **3** env files **AND** the `Nginx` conf folder

Env files:
```bash
cp box-ui/.env.template box-ui/.env
cp staging/.env.template staging/.env
cp staging/fake-marsha-backend/.env.template staging/fake-marsha-backend/.env
```
Populate those env files with your values. For the `REACT_APP_MARSHA_URL` variable, since **WE** mock the Marsha API, you must set `https://<your.domain.com>/marsha/login`.

`Nginx` conf:
```bash
cp staging/docker-data/nginx-conf/nginx-jitsi-box.conf.template staging/docker-data/nginx-conf/nginx-jitsi-box.conf
```
Modify the marsha-mimicking app port (the same value you set in the backend [env file](./fake-marsha-backend/.env.template)), the domain name and the front files path in the `Nginx` conf file. They are noted as Jinja2 variables, with double braces : `{{ variable }}`.
The front files path will be the location of the static files in the container. It is a good practice to put them in the `/var/www` folder, for instance `/var/www/jitsi-box/box-ui`, or `/var/www/DTYxFUN_Jitsi-Box`.

## Launching

If it is the first time launching the services on this server, or if the `docker-data/certbot/conf/live/<your domain>` folder is not yet populated with the `Letsencrypt` certificates, launch the [init-letsencrypt](##init-letsencrypt.sh) script.
```bash
cd staging
sudo chmod +x init-letsencrypt.sh
sudo ./init-letsencrypt.sh
```

This will create the first certificates, and launch all the services.

The website should now be accessible from any web browser.

You can check the logs with the command
```bash
docker-compose logs -f
```

You can stop, destroy and rebuild the containers as you want with the `docker-compose` command. You do not need to relaunch the [init-letsencrypt](##init-letsencrypt.sh) script, as long as you do not remove the `docker-data` folder.

Be careful, launching the [init-letsencrypt](##init-letsencrypt.sh) script starts a challenge with `Letsencrypt`, and there is a limited amount of challenges per day! To avoid hitting this limit, you can set the `staging` variable to 1 in the [script](./init-letsencrypt.sh) if you intend to launch it multiple times.

## Updating
After any modification, if you still have the SSL certificates, you can rebuild and restart the modified service with the command
```bash
docker-compose up --build --force-recreate <service name>
```
