## Website

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Contributors](https://img.shields.io/github/contributors/chesslablab/website)](https://github.com/chesslablab/website/graphs/contributors)

ChesslaBlab allows to run a safe open-source chess platform more easily than ever before. The website is super-duper simple to install and set up. The [assets/js](https://github.com/chesslablab/website/tree/main/assets/js) folder contains a few hundred lines of JavaScript code.

```text
cloc assets/js
      48 text files.
      48 unique files.                              
       0 files ignored.

github.com/AlDanial/cloc v 1.90  T=0.01 s (5087.3 files/s, 289766.7 lines/s)
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
JavaScript                      48            172              7           2555
-------------------------------------------------------------------------------
SUM:                            48            172              7           2555
-------------------------------------------------------------------------------
```

This is made possible with object-oriented programming (OOP) using [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) and the DOM.

![Figure 1](https://raw.githubusercontent.com/chesslablab/website/main/docs/readme_01.png)

The default settings can be customized through the environment variables in the [.env](https://github.com/chesslablab/website/blob/main/.env.example) file. Change the site name and the locale to configure your website whether you are a chess club, a school, or a FIDE titled player.

```text
SET_SITE_NAME=YourChessClub
SET_LOCALE=es
```

![Figure 2](https://raw.githubusercontent.com/chesslablab/website/main/docs/readme_02.png)

### Documentation

Read the latest docs [here](https://website.chesslablab.org).

### License

The [MIT License](https://github.com/chesslablab/website/blob/master/LICENSE).
