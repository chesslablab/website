# HTML Iframes

Chess authors can engage with readers on their ChesslaBlab website by embedding chess functionality into their publications.

## Analysis Board

Add the following sample HTML code to your blog post:

```text
<iframe
  title="E25 Nimzo-Indian Defense: Sämisch Variation, Keres Variation"
  width="100%"
  onload="resize(this)"
  src="https://chesslablab.org:9443/en/iframe/analysis/classical/rnbqk2r%2Fpppp1ppp%2F4pn2%2F8%2F1bPP4%2F2N5%2FPP2PPPP%2FR1BQKBNR%20w%20KQkq%20-/4.f3%20d5%205.a3%20Bxc3%2B%206.bxc3%20c5%207.cxd5%20Nxd5%208.dxc5"
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

An URL-encoded movetext.

#### `startPos` (optional)

The start position in a Chess960 game; for example `BRNNKBRQ`.
