## Website

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Contributing](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)

The ChesslaBlab website allows to play chess online outside the umbrella of mainstream platforms like Lichess or Chess.com. This means that it enables to play chess online without being tracked.

Manifesto:

- Anyone, regardless of age, race, gender or social background should have access to easy-to-use, safe and decentralized chess sites and be able to choose which one to use.
- Chess is a sport, a science, and an art.
- Players should have more control over their own online activity.
- Chess can help you improve your cognitive abilities which is a good think.
- Anyone can learn to think more scientifically.

Chess developers and business owners can now run their own open-source based platform more easily than ever before because the ChesslaBlab website is super-duper simple to install and set up. To give you an idea of its simplicity, the [assets/js](https://github.com/chesslablab/website/tree/main/assets/js) folder contains less than 3,000 lines of JavaScript code.

```text
cloc assets/js
      80 text files.
      80 unique files.                              
       0 files ignored.

github.com/AlDanial/cloc v 1.90  T=0.05 s (1474.8 files/s, 59028.2 lines/s)
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
JavaScript                      80            311             33           2858
-------------------------------------------------------------------------------
SUM:                            80            311             33           2858
-------------------------------------------------------------------------------
```

This is made possible with object-oriented programming (OOP) using [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#importing_modules_using_import_maps) which means that you can finally get rid of libraries and frameworks like React, Vue or Next.js as well as transpilers and bundlers. Say goodbye to the JavaScript fatigue! Create a sound online chess platform today. Believe it or not, the ChesslaBlab website is written using OOP and the DOM.

The following repositories are required to run an online chess platform with ChesslaBlab:

- [Website](https://github.com/chesslablab/website)
- [PHP Chess Server](https://github.com/chesslablab/chess-server)
- [PHP Chess API](https://github.com/chesslablab/chess-api)
- [Chess Data](https://github.com/chesslablab/chess-data)

It is recommended to run the online chess platform using four different servers, one per repository, although everything can be run on the same machine in the development environment. The present README file contains an overview for seasoned developers on how to install and setup a ChesslaBlab website.

More detailed documentation will be available soon.

Stay tuned!

### Install and Setup

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

The [MIT License](https://github.com/chesslablab/website/blob/master/LICENSE).

### Contributions

We encourage you to contribute to the ChesslaBlab website! Please follow the [Contributing Guidelines](https://github.com/chesslablab/website/blob/master/CONTRIBUTING.md).

<a href="https://github.com/chesslablab/website/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=chesslablab/website" />
</a>

Made with [contrib.rocks](https://contrib.rocks).
