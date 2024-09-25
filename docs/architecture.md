# Architecture

Some familiarity with [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#importing_modules_using_import_maps) as well as with Symfony's [Asset Mapper](https://symfony.com/doc/current/frontend/asset_mapper.html) component is recommended in order to follow this section.

The ChesslaBlab website is a multi-page application (MPA) that is not adhering to the MVC architectural pattern. The controller actions are basically sending an HTML document to the browser on each request. The business logic is implemented in the chess server.

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
        retarurn $this->render('pages/play/computer/index.html.twig');
    }
}
```

As a rule of thumb, there is a `.twig.html` file and a `.js` file associated to each controller action. So the structure of the [App\Controller\Pages](https://github.com/chesslablab/website/tree/main/src/Controller/Pages) namespace is mirroring the structure of both the [templates/pages](https://github.com/chesslablab/website/tree/main/templates/pages) folder and the [assets/js/pages](https://github.com/chesslablab/website/tree/main/assets/js/pages) folder.

- [src/Controller/Pages/Play/ComputerController.php](https://github.com/chesslablab/website/blob/main/src/Controller/Pages/Play/ComputerController.php)
- [templates/pages/play/computer/index.html.twig](https://github.com/chesslablab/website/blob/main/templates/pages/play/computer/index.html.twig)
- [assets/js/pages/play/computer/index.js](https://github.com/chesslablab/website/blob/main/assets/js/pages/play/computer/index.js)

This naming convention allows developers to reduce memorization because given one file name, the name of the remaining two can be inferred.

Each page's JavaScript file is then set up as an entrypoint in the [importmap.php](https://github.com/chesslablab/website/blob/main/importmap.php) config file. The main point of the entrypoint script is to update the DOM on user interaction and data change.

## WebSocket Connections

The ChesslaBlab website is integrated with [PHP Chess Server](https://chesslablab.github.io/chess-server/), an asynchronous WebSocket server that provides functionality to play chess online over a WebSocket connection.

The environment variables required for the chess server can be found in the [assets/env.example.js](https://github.com/chesslablab/website/blob/main/assets/env.example.js) file.

As described in [the docs](https://chesslablab.github.io/chess-server/start/), these are the game modes available:

- `analysis` is used to start games for further analysis.
- `play` allows to play chess online with other players.
- `stockfish` allows to play chess against the computer.

The WebSocket ESM modules are implemented based on this same separation of concerns and abstraction:

- [assets/js/websockets/game/AnalysisWebSocket.js](https://github.com/chesslablab/website/blob/main/assets/js/websockets/game/AnalysisWebSocket.js)
- [assets/js/websockets/game/PlayWebSocket.js](https://github.com/chesslablab/website/blob/main/assets/js/websockets/game/PlayWebSocket.js)
- [assets/js/websockets/game/StockfishWebSocket.js](https://github.com/chesslablab/website/blob/main/assets/js/websockets/game/StockfishWebSocket.js)

Let's say you wanted to study a particular chess opening, then a chess game in `analysis` mode is to be started.

![Figure 1](https://raw.githubusercontent.com/chesslablab/website/main/docs/architecture_01.png)

**Figure 1**. Click on **Openings > Search** and select "D77 Neo-Grünfeld Defense: Classical Variation, Modern Defense"

Data:

```text
/start classical analysis "{\"movetext\":\"1.d4 Nf6 2.Nf3 g6 3.g3 Bg7 4.Bg2 O-O 5.O-O d5 6.c4 dxc4\"}"
```

```text
{
  "variant": "classical",
  "mode": "analysis",
  "turn": "w",
  "movetext": "1.d4 Nf6 2.Nf3 g6 3.g3 Bg7 4.Bg2 O-O 5.O-O d5 6.c4 dxc4",
  "fen": [
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -",
    "rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq d3",
    "rnbqkb1r/pppppppp/5n2/8/3P4/8/PPP1PPPP/RNBQKBNR w KQkq -",
    "rnbqkb1r/pppppppp/5n2/8/3P4/5N2/PPP1PPPP/RNBQKB1R b KQkq -",
    "rnbqkb1r/pppppp1p/5np1/8/3P4/5N2/PPP1PPPP/RNBQKB1R w KQkq -",
    "rnbqkb1r/pppppp1p/5np1/8/3P4/5NP1/PPP1PP1P/RNBQKB1R b KQkq -",
    "rnbqk2r/ppppppbp/5np1/8/3P4/5NP1/PPP1PP1P/RNBQKB1R w KQkq -",
    "rnbqk2r/ppppppbp/5np1/8/3P4/5NP1/PPP1PPBP/RNBQK2R b KQkq -",
    "rnbq1rk1/ppppppbp/5np1/8/3P4/5NP1/PPP1PPBP/RNBQK2R w KQ -",
    "rnbq1rk1/ppppppbp/5np1/8/3P4/5NP1/PPP1PPBP/RNBQ1RK1 b - -",
    "rnbq1rk1/ppp1ppbp/5np1/3p4/3P4/5NP1/PPP1PPBP/RNBQ1RK1 w - d6",
    "rnbq1rk1/ppp1ppbp/5np1/3p4/2PP4/5NP1/PP2PPBP/RNBQ1RK1 b - c3",
    "rnbq1rk1/ppp1ppbp/5np1/8/2pP4/5NP1/PP2PPBP/RNBQ1RK1 w - -"
  ]
}
```

The JavaScript code for this example can be found in the [assets/js/pages/openings/search/index.js](https://github.com/chesslablab/website/blob/main/assets/js/pages/openings/search/index.js) file.

```js
import { openingsSearchModal } from './OpeningsSearchModal.js';
import { binaryWebSocket } from '../../../websockets/binary/BinaryWebSocket.js';
import { analysisWebSocket } from '../../../websockets/game/AnalysisWebSocket.js';

sessionStorage.clear();

try {
  await binaryWebSocket.connect();
} catch {}

try {
  await analysisWebSocket.connect();
} catch {}

openingsSearchModal.props.modal.show();
```

The JavaScript code in the index.js file basically boils down to initialization. The business logic is implemented by a WebSocket ESM module. When the web browser retrieves the response from the WebSocket server, the ESM components are updated with the new data. In this particular case, the chessboard and the SAN panel are updated on chess opening selection.

Remember, the structure of the [App\Controller\Pages](https://github.com/chesslablab/website/tree/main/src/Controller/Pages) namespace is mirroring the structure of both the [templates/pages](https://github.com/chesslablab/website/tree/main/templates/pages) folder and the [assets/js/pages](https://github.com/chesslablab/website/tree/main/assets/js/pages) folder. There is a `.twig.html` file and a `.js` file associated to each controller action. This naming convention allows developers to reduce memorization because given one file name, the name of the remaining two can be inferred.

- [src/Controller/Pages/Openings/SearchController.php](https://github.com/chesslablab/website/blob/main/src/Controller/Pages/Openings/SearchController.php)
- [templates/pages/openings/search/index.html.twig](https://github.com/chesslablab/website/blob/main/templates/pages/openings/search/index.html.twig)
- [assets/js/pages/openings/search/index.js](https://github.com/chesslablab/website/blob/main/assets/js/pages/openings/search/index.js)

Similarly, if you wanted to study a chess position, then a FEN string needs to be started.

![Figure 2](https://raw.githubusercontent.com/chesslablab/website/main/docs/architecture_02.png)

**Figure 2**. Click on **Learn > Analysis Chessboard** and enter a classical chess position in FEN format.

Data:

```text
/start classical analysis "{\"fen\":\"r2q1r1k/1b1nN2p/pp3pp1/8/Q7/PP5P/1BP2RPN/7K w - -\",\"movetext\":\"\"}"
```

```text
{
  "variant": "classical",
  "mode": "analysis",
  "turn": "w",
  "movetext": "",
  "fen": [
    "r2q1r1k/1b1nN2p/pp3pp1/8/Q7/PP5P/1BP2RPN/7K w - -"
  ]
}
```

The JavaScript code for this example can be found in the [assets/js/pages/learn/analysis/index.js](https://github.com/chesslablab/website/blob/main/assets/js/pages/learn/analysis/index.js) file.

```js
import { binaryWebSocket } from '../../../websockets/binary/BinaryWebSocket.js';
import { analysisWebSocket } from '../../../websockets/game/AnalysisWebSocket.js';
import * as mode from '../../../../mode.js';

sessionStorage.clear();

try {
  await binaryWebSocket.connect();
} catch {}

try {
  await analysisWebSocket.connect();
} catch {}

analysisWebSocket.send(`/start classical ${mode.ANALYSIS}`);
```

The two examples above will give you a sense of the request-response cycle between the web browser and the chess server.
