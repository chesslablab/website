# Website Architecture

It is worth saying that the ChesslaBlab website is a multi-page application (MPA) that is not adhering to the MVC architectural pattern. The controller actions are basically sending an HTML document to the browser on each request with the business logic being split between the chess server and the chess API.

The main reason behind a multi-page architecture as opposed to a single-page architecture is that we want the pages to be indexed by web crawlers. In this website architecture in particular, there is no model layer (M) and as a result the Controller layer (C) remains quite basic as in the following example.

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

The structure of the [App\Controller\Pages](src/Controller/Pages) namespace is mirroring the structure of the [templates/pages](https://github.com/chesslablab/website/tree/main/templates/pages) folder as well as the structure of the [assets/js/pages](https://github.com/chesslablab/website/tree/main/assets/js/pages) folder. As a rule of thumb, there is a `.twig.html` file and a `.js` file for each controller action.
