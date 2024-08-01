# Installation

Clone the `chesslablab/website` repo into your projects folder. Then `cd` the `website` directory and create an `.env` file:

```text
cp .env.example .env
```

Update the `.env` file to your specific needs.

Set up the browser environment variables:

```text
cp assets/env.example.js assets/env.js
```

Update the `env.js` file to your specific needs.

Make sure to have installed the `fullchain.pem` and `privkey.pem` files into the `docker/nginx/ssl` folder, and run the Docker containers in detached mode in the background:

```txt
docker compose -f docker-compose.default.yml up -d
```

Clear the cache:

```text
docker exec -itu 1000:1000 chess_website_php php bin/console cache:clear
```

Download the assets:

```text
docker exec -itu 1000:1000 chess_website_php php bin/console importmap:install
```

Compile the assets:

```text
docker exec -itu 1000:1000 chess_website_php php bin/console asset-map:compile
```

Finally, if you are running the website in a local development environment, you may want to add a domain name entry to your `/etc/hosts` file.

```txt
127.0.0.1       chesslablab.org
```
