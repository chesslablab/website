# WebSocket Integration

The ChesslaBlab website is integrated with [PHP Chess Server](https://chesslablab.github.io/chess-server/), an asynchronous WebSocket server that provides functionality to play chess online over a WebSocket connection.

As described in [the docs](https://chesslablab.github.io/chess-server/start/), four different game modes are provided.

| Mode        | Description                                                              |
| ----------- | ------------------------------------------------------------------------ |
| `fen`       | Allows to continue playing a game from a specific position.              |
| `san`       | Allows to continue playing an annotated game from the starting position. |
| `play`      | Allows to play chess online with other players.                          |
| `stockfish` | Allows to play chess against the computer.                               |

The WebSocket ESM modules are implemented based on this separation of concerns and abstraction:

- [assets/js/FenWebSocket.js](https://github.com/chesslablab/website/blob/main/assets/js/FenWebSocket.js)
- [assets/js/SanWebSocket.js](https://github.com/chesslablab/website/blob/main/assets/js/SanWebSocket.js)
- [assets/js/PlayWebSocket.js](https://github.com/chesslablab/website/blob/main/assets/js/PlayWebSocket.js)
- [assets/js/StockfishWebSocket.js](https://github.com/chesslablab/website/blob/main/assets/js/StockfishWebSocket.js)

Let's say you wanted to study a particular chess opening, then a chess game in SAN mode is to be started.

![Figure 1](https://raw.githubusercontent.com/chesslablab/website/main/docs/websocket-integration_01.png)

**Figure 1**. Click on **Openings > ECO Code** and select "D77 Neo-Grünfeld Defense: Classical Variation, Modern Defense"

Command:

```text
/start classical san "{\"movetext\":\"1.d4 Nf6 2.Nf3 g6 3.g3 Bg7 4.Bg2 O-O 5.O-O d5 6.c4 dxc4\"}"
```

Response:

```text
{
  "variant": "classical",
  "mode": "san",
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

The JavaScript code for this example can be found in the [assets/js/pages/openings/eco_code/index.js](https://github.com/chesslablab/website/blob/main/assets/js/pages/openings/eco_code/index.js) file.

```js
import { openingsEcoCodeModal } from './OpeningsEcoCodeModal.js';
import { sanWebSocket } from '../../../SanWebSocket.js';

await sanWebSocket.connect();

sessionStorage.clear();

openingsEcoCodeModal.props.modal.show();
```

Remember, the structure of the [App\Controller\Pages](https://github.com/chesslablab/website/tree/main/src/Controller/Pages) namespace is mirroring the structure of both the [templates/pages](https://github.com/chesslablab/website/tree/main/templates/pages) folder and the [assets/js/pages](https://github.com/chesslablab/website/tree/main/assets/js/pages) folder. As a rule of thumb, there is a `.twig.html` file and a `.js` file associated to each controller action. This naming convention allows developers to reduce memorization because given one file name, the name of the remaining two can be inferred.

- [src/Controller/Pages/Openings/EcoCodeController.php](https://github.com/chesslablab/website/blob/main/src/Controller/Pages/Openings/EcoCodeController.php)
- [templates/pages/openings/eco_code/index.html.twig](https://github.com/chesslablab/website/blob/main/templates/pages/openings/eco_code/index.html.twig)
- [assets/js/pages/openings/eco_code/index.js](https://github.com/chesslablab/website/blob/main/assets/js/pages/openings/eco_code/index.js)
