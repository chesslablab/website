# Installation

## Setup

Clone the `chesslablab/website` repo into your projects folder. Then `cd` the `website` directory and install the Composer dependencies:

```text
composer install
```

Set up the browser environment variables:

```text
cp assets/env.example.js assets/env.js
```

Clear the cache:

```text
php bin/console cache:clear
```

Download the assets:

```text
php bin/console importmap:install
```

Compile the assets:

```text
php bin/console asset-map:compile
```

Set up file permissions for the `var/cache` folder:

```
sudo chmod 775 -R var/cache
sudo chown $USER:www-data -R var/cache
```

Set up file permissions for the `var/log` folder:

```
sudo chmod 775 -R var/cache
sudo chown $USER:www-data -R var/log
```

## Run on a Docker Container

First things first, make sure to have created the `fullchain.pem` and `privkey.pem` files into the `docker/nginx/ssl` folder.

### Development

Run the app on port `9443`.

```text
docker compose -f docker-compose.dev.yml up -d
```

### Production

Run the app on port `443`.

```text
docker compose -f docker-compose.prod.yml up -d
```

### License

The [MIT License](https://github.com/chesslablab/website/blob/master/LICENSE).

### Contributions

We encourage you to contribute to the ChesslaBlab website! Please follow the [Contributing Guidelines](https://github.com/chesslablab/website/blob/master/CONTRIBUTING.md).

<a href="https://github.com/chesslablab/website/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=chesslablab/website" />
</a>

Made with [contrib.rocks](https://contrib.rocks).
