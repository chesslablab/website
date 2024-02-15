## MpaBlab

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Contributing](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)

A multi-page app (MPA) using server-side rendering (SSR) to learn and play chess online.

### Install and Setup

Clone the `chesslablab/mpablab` repo into your projects folder as it is described in the following example:

```text
git clone git@github.com:chesslablab/mpablab.git
```

Then `cd` the `mpablab` directory and install the Composer dependencies:

```text
composer install
```

Create an `.env` file:

```text
cp .env.example .env
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

```text
docker-compose up -d
```

### License

The [MIT License](https://github.com/chesslablab/mpablab/blob/master/LICENSE).

### Contributions

See the [contributing guidelines](https://github.com/chesslablab/mpablab/blob/master/CONTRIBUTING.md).

Happy learning and coding!
