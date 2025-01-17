## Website

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Contributors](https://img.shields.io/github/contributors/chesslablab/website)](https://github.com/chesslablab/website/graphs/contributors)

ChesslaBlab allows to run an open-source chess platform more easily than ever before. The website is super-duper simple to install and set up. The [assets/js](https://github.com/chesslablab/website/tree/main/assets/js) folder contains a few hundred lines of JavaScript code.

```text
cloc assets/js
      50 text files.
      50 unique files.                              
       0 files ignored.

github.com/AlDanial/cloc v 1.90  T=0.01 s (5108.8 files/s, 285989.2 lines/s)
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
JavaScript                      50            177              1           2621
-------------------------------------------------------------------------------
SUM:                            50            177              1           2621
-------------------------------------------------------------------------------
```

This is made possible with object-oriented programming (OOP) using [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) and the DOM.

![Figure 1](https://raw.githubusercontent.com/chesslablab/website/main/docs/featured_animation.gif)

The default settings can be customized through the environment variables in the [.env](https://github.com/chesslablab/website/blob/main/.env.example) file. Change the site name and the locale to configure your website whether you are a chess club, a school, or a FIDE titled player.

```text
SET_SITE_NAME=YourChessClub
SET_LOCALE=es
```

### Documentation

Read the latest docs [here](https://website.chesslablab.org).

### License

The [MIT License](https://github.com/chesslablab/website/blob/master/LICENSE).

### Contributions

We encourage you to contribute to the ChesslaBlab website! Please follow the [Contributing Guidelines](https://github.com/chesslablab/website/blob/master/CONTRIBUTING.md).

<a href="https://github.com/chesslablab/website/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=chesslablab/website" />
</a>

Made with [contrib.rocks](https://contrib.rocks).
