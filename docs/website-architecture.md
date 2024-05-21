# Website Architecture

Some familiarity with [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#importing_modules_using_import_maps) as well as with Symfony's [Asset Mapper](https://symfony.com/doc/current/frontend/asset_mapper.html) component is recommended in order to follow this section.

The ChesslaBlab website is a multi-page application (MPA) that is not adhering to the MVC architectural pattern. The controller actions are basically sending an HTML document to the browser on each request with the business logic being split between the chess server and the chess API.

In this website architecture in particular, there is no model layer (M) and as a result the Controller layer (C) remains quite basic as in the following example. The main reason behind a multi-page architecture like this one as opposed to a single-page architecture is that we want the pages to be indexed by web crawlers.

```php
<?php

namespace App\Controller\Pages\Play;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class ComputerController extends AbstractController
{
    public function index(): Response
    {
        return $this->render('pages/play/computer/index.html.twig');
    }
}
```

As a rule of thumb, there is a `.twig.html` file and a `.js` file associated to each controller action. So the structure of the [App\Controller\Pages](src/Controller/Pages) namespace is mirroring the structure of both the [templates/pages](https://github.com/chesslablab/website/tree/main/templates/pages) folder and the [assets/js/pages](https://github.com/chesslablab/website/tree/main/assets/js/pages) folder.

- [src/Controller/Pages/Play/ComputerController.php](https://github.com/chesslablab/website/blob/main/src/Controller/Pages/Play/ComputerController.php)
- [templates/pages/play/computer/index.html.twig](https://github.com/chesslablab/website/blob/main/templates/pages/play/computer/index.html.twig)
- [assets/js/pages/play/computer/index.js](https://github.com/chesslablab/website/blob/main/assets/js/pages/play/computer/index.js)

This naming convention allows developers to reduce memorization because given one file name, the name of the remaining two can be inferred.

Each page's JavaScript file is then set up as an entrypoint in the [importmap.php](https://github.com/chesslablab/website/blob/main/importmap.php) config file. The main point of the entrypoint script is to update the DOM on user interaction and data change.
