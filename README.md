## Chess MPA

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Contributing](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)

A server-side rendered (SSR) multi-page app (MPA) to learn and play chess online.

### Install and Setup

Clone the `chesslablab/chess-mpa` repo into your projects folder as it is described in the following example:

```text
git clone git@github.com:chesslablab/chess-mpa.git
```

Then `cd` the `chess-mpa` directory and install the Composer dependencies:

```text
composer install
```

Create an `.env` file:

```text
cp .env.example .env
```

Download assets:

```text
php bin/console importmap:install
```

Compile assets:

```text
php bin/console asset-map:compile
```

### License

The [MIT License](https://github.com/chesslablab/chess-mpa/blob/master/LICENSE).

### Contributions

See the [contributing guidelines](https://github.com/chesslablab/chess-mpa/blob/master/CONTRIBUTING.md).

Happy learning and coding!
