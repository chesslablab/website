# Website

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Contributing](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)

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

This is made possible with object-oriented programming (OOP) using [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#importing_modules_using_import_maps). Say goodbye to JavaScript fatigue! Get rid of libraries and frameworks like React, Vue or Next.js as well as transpilers and bundlers. The ChesslaBlab website is written using OOP and the DOM.

The following repositories are required to run an online chess platform with ChesslaBlab:

- [Website](https://github.com/chesslablab/website)
- [PHP Chess Server](https://github.com/chesslablab/chess-server)
- [PHP Chess API](https://github.com/chesslablab/chess-api)
- [Chess Data](https://github.com/chesslablab/chess-data)

It is recommended to run the online chess platform using four different servers, one per repository, although everything can be run on the same machine in the development environment. The present README file contains an overview for seasoned developers on how to install and setup a ChesslaBlab website.
