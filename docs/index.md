# Website

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Contributing](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)

Chess developers and business owners can now run their own open-source chess platform more easily than ever before because the ChesslaBlab website is super-duper simple to install and set up. To give you an idea of its simplicity, the Website's [assets/js](https://github.com/chesslablab/website/tree/main/assets/js) folder contains less than 3,000 lines of JavaScript code.

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

This is made possible with object-oriented programming (OOP) using [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#importing_modules_using_import_maps). Now you can get rid of libraries and frameworks like React, Vue, Next.js, as well as transpilers, bundlers and so on. The ChesslaBlab website is written using OOP and the DOM.

## Environment Setup

### Development

The following repositories are required to run a complete chess platform in a local development environment:

- [Chess Data](https://github.com/chesslablab/chess-data)
- [PHP Chess Server](https://github.com/chesslablab/chess-server)
- [Website](https://github.com/chesslablab/website)

Remember to add your PHP Chess Server host name to the `assets/env.js` file of your website.

### Decentralized

With decentralized chess (DeChess) a complete chess platform can be run using one ChesslaBlab repository only:

- [Website](https://github.com/chesslablab/website)

Make sure to add at least a PHP Chess Server host name from the [ChesslaBlab Node List](https://github.com/chesslablab#node-list) to the `assets/env.js` file of your website.
