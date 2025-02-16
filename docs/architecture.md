# Architecture

Some familiarity with [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#importing_modules_using_import_maps) as well as with Symfony's [Asset Mapper](https://symfony.com/doc/current/frontend/asset_mapper.html) component is recommended in order to follow this section.

The ChesslaBlab website is a multi-page application (MPA) where controller actions are basically sending an HTML document to the browser on each request. The business logic is implemented in the chess server, and as a result the controller layer remains thin as in the following example.

```php
<?php

namespace App\Controller\Pages\Play;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class ComputerController extends AbstractController
{
    public function index(): Response
    {
        return $this->render('pages/play/computer/index.html.twig', [
            'entrypoint' => 'js/pages/play/computer/index.js',
        ]);
    }
}
```

As a rule of thumb, there is a `.twig.html` file and a `.js` file associated to each controller action.

- [src/Controller/Pages/Play/ComputerController.php](https://github.com/chesslablab/website/blob/main/src/Controller/Pages/Play/ComputerController.php)
- [templates/pages/play/computer/index.html.twig](https://github.com/chesslablab/website/blob/main/templates/pages/play/computer/index.html.twig)
- [assets/js/pages/play/computer/index.js](https://github.com/chesslablab/website/blob/main/assets/js/pages/play/computer/index.js)

This naming convention allows developers to reduce memorization because given one file name, the name of the remaining two can be inferred.

Each page's JavaScript file is then set up as an entrypoint in the [importmap.php](https://github.com/chesslablab/website/blob/main/importmap.php) config file. The main point of the entrypoint script is to update the DOM on user interaction and data change.

So the JavaScript code in the [assets/js/pages/play/computer/index.js](https://github.com/chesslablab/website/blob/main/assets/js/pages/play/computer/index.js) file basically boils down to initialization because the business logic is implemented in WebSocket ESM modules. When the web browser retrieves the response from the WebSocket server, the ESM components are updated with the new data.

```js
import { playComputerModal } from './PlayComputerModal.js';
import { binaryWebSocket } from '../../../websockets/binary/BinaryWebSocket.js';
import { stockfishWebSocket } from '../../../websockets/game/StockfishWebSocket.js';

try {
  await Promise.all([
    binaryWebSocket.connect(),
    stockfishWebSocket.connect()
  ]);
} catch {}

playComputerModal.props.modal.show();
```

## WebSocket Connections

The ChesslaBlab website is integrated with [PHP Chess Server](https://github.com/chesslablab/chess-server), an asynchronous WebSocket server that provides functionality to play chess online over a WebSocket connection.

The environment variables required for the chess server can be found in the [assets/env.example.js](https://github.com/chesslablab/website/blob/main/assets/env.example.js) file.

These are the game modes available:

- `analysis` is used to start games for further analysis.
- `play` allows to play chess online with other players.
- `stockfish` allows to play chess against the computer.

The WebSocket ESM modules are implemented based on this same separation of concerns and abstraction:

- [assets/js/websockets/game/AnalysisWebSocket.js](https://github.com/chesslablab/website/blob/main/assets/js/websockets/game/AnalysisWebSocket.js)
- [assets/js/websockets/game/PlayWebSocket.js](https://github.com/chesslablab/website/blob/main/assets/js/websockets/game/PlayWebSocket.js)
- [assets/js/websockets/game/StockfishWebSocket.js](https://github.com/chesslablab/website/blob/main/assets/js/websockets/game/StockfishWebSocket.js)
