# HTML Iframes

Chess authors can engage with readers on their ChesslaBlab website by embedding chess functionality into their publications.

## Analysis Board

Add the following sample HTML code to your blog post:

```text
<iframe
  title="E25 Nimzo-Indian Defense: Sämisch Variation, Keres Variation"
  width="100%"
  onload="resize(this)"
  src="https://chesslablab.org/en/iframe/analysis/classical/rnbqk2r%2Fpppp1ppp%2F4pn2%2F8%2F1bPP4%2F2N5%2FPP2PPPP%2FR1BQKBNR%20w%20KQkq%20-/4.f3%20d5%205.a3%20Bxc3%2B%206.bxc3%20c5%207.cxd5%20Nxd5%208.dxc5"
>
</iframe>
```

![Figure 1](https://raw.githubusercontent.com/chesslablab/website/main/docs/html-iframes_01.png)

**Figure 1**. E25 Nimzo-Indian Defense: Sämisch Variation, Keres Variation.

### Parameters

#### `variant`

The chess variant as per these options.

- `classical` chess, also known as standard or slow chess.
- `960` is the same as classical chess except that the starting position of the pieces is randomized.
- `dunsany` is an asymmetric variant in which Black has the standard chess army and White has 32 pawns.
- `losing` chess, the objective of each player is to lose all of their pieces or be stalemated.
- `racing-kings` consists of being the first player to move their king to the eighth row.

#### `fen`

An URL-encoded FEN string.

#### `movetext`

An URL-encoded movetext in SAN format.

## Annotations Board

Add the following sample HTML code to your blog post:

```text
<iframe
  title="Lasker - Capablanca World Championship"
  width="100%"
  onload="resize(this)"
  src="https://chesslablab.org/en/iframe/annotations/classical/rnbqkbnr%2Fpppppppp%2F8%2F8%2F8%2F8%2FPPPPPPPP%2FRNBQKBNR%20w%20KQkq%20-/%7B%20Adapted%20notes%2C%20originally%20by%20J.%20R.%20Capablanca.%20%7D%201.d4%20d5%202.c4%20e6%203.Nc3%20Nf6%204.Bg5%20Be7%205.e3%20O-O%206.Nf3%20Nbd7%207.Qc2%20c6%20%287...c5%20%7B%20is%20the%20proper%20move.%20%7D%29%208.Bd3%20%288.O-O-O%20%7B%20would%20have%20been%20a%20much%20more%20energetic%20way%20of%20continuing%2C%20but%20probably%20White%20did%20not%20want%20to%20take%20the%20risk%20of%20exposing%20its%20king%20to%20a%20queen%27s%20side%20attack.%20%7D%29%208...dxc4%209.Bxc4%20Nd5%2010.Bxe7%20Qxe7%2011.O-O%20Nxc3%2012.bxc3%20b6%2013.Bd3%20g6%2014.a4%20Bb7%2015.a5%20c5%2016.Nd2%20%7B%20may%20not%20have%20been%20White%27s%20best%20move%20yet%20it%20is%20extremely%20difficult%20to%20point%20out%20anything%20better.%7D%20e5%20%7B%20is%20probably%20the%20only%20move%20to%20save%20the%20game.%20It%20was%20essential%20to%20break%20up%20White%27s%20center%20to%20create%20a%20weakness%20in%20White%27s%20game.%20This%20would%20compensate%20Black%20for%20its%20queen%20side%20weakness.%20%7D%2017.Be4%20Bxe4%2018.Qxe4%20Rae8%2019.axb6%20axb6%2020.Ra7%20exd4%2021.Qc6%20%2821.Qxe7%20%7B%20was%20slightly%20better%20but%20Black%20had%20in%20that%20case%20an%20adequate%20defense.%20%7D%29%2021...Rd8%2022.cxd4%20cxd4%2023.exd4%20%2823.Ne4%20Nb8%20%29%2023...Qf6%2024.Qxf6%20Nxf6%2025.Nf3%20Nd5%2026.Rb1%20f6%2027.Kf1%20Rf7%2028.Rba1%20Rdd7%2029.Rxd7%20Rxd7%2030.g3%20%7B%20and%20there%20was%20no%20reason%20to%20continue%20the%20game%20because%20neither%20player%20had%20much%20to%20do.%20%7D%201%2F2-1%2F2"
>
</iframe>
```

![Figure 2](https://raw.githubusercontent.com/chesslablab/website/main/docs/html-iframes_02.png)

**Figure 2**. Lasker - Capablanca World Championship.

### Parameters

#### `variant`

The chess variant as per these options.

- `classical` chess, also known as standard or slow chess.
- `960` is the same as classical chess except that the starting position of the pieces is randomized.
- `dunsany` is an asymmetric variant in which Black has the standard chess army and White has 32 pawns.
- `losing` chess, the objective of each player is to lose all of their pieces or be stalemated.
- `racing-kings` consists of being the first player to move their king to the eighth row.

#### `fen`

An URL-encoded FEN string.

#### `movetext`

An URL-encoded movetext in RAV format.
