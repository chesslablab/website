## MpaBlab

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Contributing](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)

The ChesslaBlab website allows users to learn and play chess online.

### Install and Setup

Clone the `chesslablab/mpablab` repo into your projects folder. Then `cd` the `mpablab` directory and install the Composer dependencies:

```text
composer install
```

Set up the browser environment variables:

```text
cp assets/env.example.js assets/env.js
```

Download the assets:

```text
php bin/console importmap:install
```

Compile the assets:

```text
php bin/console asset-map:compile
```

## Run the MPA on a Docker Container

First things first, make sure to have created the `fullchain.pem` and `privkey.pem` files into the `docker/nginx/ssl` folder. Then run the MPA:

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

The [MIT License](https://github.com/chesslablab/mpablab/blob/master/LICENSE).

### Contributions

See the [contributing guidelines](https://github.com/chesslablab/mpablab/blob/master/CONTRIBUTING.md).

Happy learning and coding!
