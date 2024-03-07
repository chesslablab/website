import {
  INPUT_EVENT_TYPE,
  COLOR,
  Chessboard,
  BORDER_TYPE,
  Accessibility,
  MARKER_TYPE,
  Markers,
  FEN,
  PromotionDialog
} from '@chesslablab/cmblab';
import {
  GameActionsDropdown,
  HistoryButtons,
  OpeningTable,
  RavMovesTable
} from '@chesslablab/jsblab';
import Modal from 'bootstrap/js/dist/modal.js';

// -----------------------------------------------------------------------------
// Initialization
// -----------------------------------------------------------------------------

const props = {
  filtered: "{Adapted notes, originally by J. R. Capablanca.} 1.d4 d5 2.Nf3 e6 3.c4 Nf6 4.Bg5 Be7 5.e3 Nbd7 6.Nc3 O-O 7.Rc1 c6 8.Qc2 c5 {is not a recommended move.} 9.Rd1 (9.cxd5 {would have been proper to continue.}) 9...Qa5 10.cxd5 Nxd5 11.Bxe7 Nxe7 12.Bd3 Nf6 13.O-O cxd4 14.Nxd4 (14.exd4 {was the alternative. It would have left, however, to a very difficult game where, in exchange for the attack, White would remain with an isolated queen\u0027s pawn; leading at this stage of the match by one point, I did not want to take any risks.}) 14...Bd7 15.Ne4 Ned5 16.Nb3 Qd8 17.Nxf6+ Nxf6 18.Qc5 Qb6 {neutralizes whatever little advantage White might have had. The draw is now insight.} 19.Rc1 Rfc8 20.Qxb6 axb6 21.Rxc8+ Rxc8 22.Rc1 Rxc1+ 23.Nxc1 Kf8",
  breakdown: [
    "{Adapted notes, originally by J. R. Capablanca.} 1.d4 d5 2.Nf3 e6 3.c4 Nf6 4.Bg5 Be7 5.e3 Nbd7 6.Nc3 O-O 7.Rc1 c6 8.Qc2 c5 {is not a recommended move.} 9.Rd1",
    "9.cxd5 {would have been proper to continue.}",
    "9...Qa5 10.cxd5 Nxd5 11.Bxe7 Nxe7 12.Bd3 Nf6 13.O-O cxd4 14.Nxd4",
    "14.exd4 {was the alternative. It would have left, however, to a very difficult game where, in exchange for the attack, White would remain with an isolated queen\u0027s pawn; leading at this stage of the match by one point, I did not want to take any risks.}",
    "14...Bd7 15.Ne4 Ned5 16.Nb3 Qd8 17.Nxf6+ Nxf6 18.Qc5 Qb6 {neutralizes whatever little advantage White might have had. The draw is now insight.} 19.Rc1 Rfc8 20.Qxb6 axb6 21.Rxc8+ Rxc8 22.Rc1 Rxc1+ 23.Nxc1 Kf8"
  ],
  fen: [
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -",
    "rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq d3",
    "rnbqkb1r/pppppppp/5n2/8/3P4/8/PPP1PPPP/RNBQKBNR w KQkq -",
    "rnbqkb1r/pppppppp/5n2/8/2PP4/8/PP2PPPP/RNBQKBNR b KQkq c3",
    "rnbqkb1r/pppp1ppp/4pn2/8/2PP4/8/PP2PPPP/RNBQKBNR w KQkq -",
    "rnbqkb1r/pppp1ppp/4pn2/8/2PP4/5N2/PP2PPPP/RNBQKB1R b KQkq -",
    "rnbqkb1r/ppp2ppp/4pn2/3p4/2PP4/5N2/PP2PPPP/RNBQKB1R w KQkq d6",
    "rnbqkb1r/ppp2ppp/4pn2/3p4/2PP4/2N2N2/PP2PPPP/R1BQKB1R b KQkq -",
    "rnbqk2r/ppp1bppp/4pn2/3p4/2PP4/2N2N2/PP2PPPP/R1BQKB1R w KQkq -",
    "rnbqk2r/ppp1bppp/4pn2/3p4/2PP1B2/2N2N2/PP2PPPP/R2QKB1R b KQkq -",
    "rnbq1rk1/ppp1bppp/4pn2/3p4/2PP1B2/2N2N2/PP2PPPP/R2QKB1R w KQ -",
    "rnbq1rk1/ppp1bppp/4pn2/3p4/2PP1B2/2N1PN2/PP3PPP/R2QKB1R b KQ -",
    "rnbq1rk1/pp2bppp/4pn2/2pp4/2PP1B2/2N1PN2/PP3PPP/R2QKB1R w KQ c6",
    "rnbq1rk1/pp2bppp/4pn2/2Pp4/2P2B2/2N1PN2/PP3PPP/R2QKB1R b KQ -",
    "rnbq1rk1/pp3ppp/4pn2/2bp4/2P2B2/2N1PN2/PP3PPP/R2QKB1R w KQ -",
    "rnbq1rk1/pp3ppp/4pn2/2bp4/2P2B2/P1N1PN2/1P3PPP/R2QKB1R b KQ -",
    "r1bq1rk1/pp3ppp/2n1pn2/2bp4/2P2B2/P1N1PN2/1P3PPP/R2QKB1R w KQ -",
    "r1bq1rk1/pp3ppp/2n1pn2/2bp4/2P2B2/P1N1PN2/1P3PPP/2RQKB1R b K -",
    "r1bq1rk1/1p3ppp/p1n1pn2/2bp4/2P2B2/P1N1PN2/1P3PPP/2RQKB1R w K -",
    "r1bq1rk1/1p3ppp/p1n1pn2/2bp4/1PP2B2/P1N1PN2/5PPP/2RQKB1R b K b3",
    "r1bq1rk1/1p3ppp/p1nbpn2/3p4/1PP2B2/P1N1PN2/5PPP/2RQKB1R w K -",
    "r1bq1rk1/1p3ppp/p1nbpn2/3p2B1/1PP5/P1N1PN2/5PPP/2RQKB1R b K -",
    "r1bq1rk1/1p3ppp/2nbpn2/p2p2B1/1PP5/P1N1PN2/5PPP/2RQKB1R w K -",
    "r1bq1rk1/1p3ppp/2nbpn2/pP1p2B1/2P5/P1N1PN2/5PPP/2RQKB1R b K -",
    "r1bq1rk1/1p2nppp/3bpn2/pP1p2B1/2P5/P1N1PN2/5PPP/2RQKB1R w K -",
    "r1bq1rk1/1p2nppp/3bpB2/pP1p4/2P5/P1N1PN2/5PPP/2RQKB1R b K -",
    "r1bq1rk1/1p2np1p/3bpp2/pP1p4/2P5/P1N1PN2/5PPP/2RQKB1R w K -",
    "r1bq1rk1/1p2np1p/3bpp2/pP1p4/P1P5/2N1PN2/5PPP/2RQKB1R b K -",
    "r1bq1rk1/1p2np1p/4pp2/pP1p4/PbP5/2N1PN2/5PPP/2RQKB1R w K -",
    "r1bq1rk1/1p2np1p/4pp2/pP1p4/PbP5/2N1PN2/4BPPP/2RQK2R b K -",
    "r1bq1rk1/1p2np1p/4pp2/pP6/Pbp5/2N1PN2/4BPPP/2RQK2R w K -",
    "r1bq1rk1/1p2np1p/4pp2/pP6/Pbp5/2N1PN2/4BPPP/2RQ1RK1 b - -",
    "r1bq1rk1/1p3p1p/4pp2/pP1n4/Pbp5/2N1PN2/4BPPP/2RQ1RK1 w - -",
    "r1bq1rk1/1p3p1p/4pp2/pP1n4/Pbp5/4PN2/N3BPPP/2RQ1RK1 b - -",
    "r1bq1rk1/1p3p1p/1n2pp2/pP6/Pbp5/4PN2/N3BPPP/2RQ1RK1 w - -",
    "r1bq1rk1/1p3p1p/1n2pp2/pP6/Pbp5/4PN2/N1Q1BPPP/2R2RK1 b - -",
    "r1bq1rk1/1p3p1p/1n3p2/pP2p3/Pbp5/4PN2/N1Q1BPPP/2R2RK1 w - -",
    "r1bq1rk1/1p3p1p/1n3p2/pP2p3/PNp5/4PN2/2Q1BPPP/2R2RK1 b - -",
    "r1bq1rk1/1p3p1p/1n3p2/1P2p3/Ppp5/4PN2/2Q1BPPP/2R2RK1 w - -",
    "r1bq1rk1/1p3p1p/1n3p2/1P2p3/PpB5/4PN2/2Q2PPP/2R2RK1 b - -",
    "r1bq1rk1/1p3p1p/5p2/1P2p3/Ppn5/4PN2/2Q2PPP/2R2RK1 w - -",
    "r1bq1rk1/1p3p1p/5p2/1P2p3/PpQ5/4PN2/5PPP/2R2RK1 b - -",
    "2bq1rk1/1p3p1p/5p2/1P2p3/rpQ5/4PN2/5PPP/2R2RK1 w - -",
    "2bq1rk1/1p3p1p/5p2/1P2p3/rpQ5/4PN2/5PPP/2RR2K1 b - -",
    "2b2rk1/1p3p1p/1q3p2/1P2p3/rpQ5/4PN2/5PPP/2RR2K1 w - -",
    "2b2rk1/1p3p1p/1q3p2/1P2p3/rpQ4N/4P3/5PPP/2RR2K1 b - -",
    "5rk1/1p3p1p/1q2bp2/1P2p3/rpQ4N/4P3/5PPP/2RR2K1 w - -",
    "5rk1/1p3p1p/1q2bp2/1P2p3/rp2Q2N/4P3/5PPP/2RR2K1 b - -",
    "5rk1/1p3p1p/4bp2/1q2p3/rp2Q2N/4P3/5PPP/2RR2K1 w - -",
    "5rk1/1p3p1p/4bp2/1q2p3/rp5N/4PQ2/5PPP/2RR2K1 b - -",
    "5r2/1p3pkp/4bp2/1q2p3/rp5N/4PQ2/5PPP/2RR2K1 w - -",
    "5r2/1p3pkp/4bp2/1q2pN2/rp6/4PQ2/5PPP/2RR2K1 b - -",
    "5r2/1p3pkp/5p2/1q2pb2/rp6/4PQ2/5PPP/2RR2K1 w - -",
    "5r2/1p3pkp/5p2/1q2pQ2/rp6/4P3/5PPP/2RR2K1 b - -",
    "5r2/1p3pkp/5p2/1q2pQ2/r7/1p2P3/5PPP/2RR2K1 w - -",
    "5r2/1p3pkp/3R1p2/1q2pQ2/r7/1p2P3/5PPP/2R3K1 b - -",
    "5r2/1p3pkp/3R1p2/1q2pQ2/r7/4P3/1p3PPP/2R3K1 w - -",
    "5r2/1p3pkp/3R1Q2/1q2p3/r7/4P3/1p3PPP/2R3K1 b - -",
    "5rk1/1p3p1p/3R1Q2/1q2p3/r7/4P3/1p3PPP/2R3K1 w - -",
    "5rk1/1p3p1p/3R4/1q2p1Q1/r7/4P3/1p3PPP/2R3K1 b - -",
    "5r1k/1p3p1p/3R4/1q2p1Q1/r7/4P3/1p3PPP/2R3K1 w - -",
    "5r1k/1p3p1p/3R1Q2/1q2p3/r7/4P3/1p3PPP/2R3K1 b - -"
  ]
};

const chessboard = new Chessboard(
  document.getElementById('chessboard'),
  {
    assetsUrl: "https://cdn.jsdelivr.net/npm/cm-chessboard@8.5.0/assets/",
    position: props.fen[props.fen.length - 1],
    style: {pieces: {file: "pieces/staunty.svg"}},
    extensions: [{class: Markers}]
  }
);

export const ravMovesTable = new RavMovesTable(
  document.querySelector('#ravMovesTable tbody'),
  {
    ...props,
    chessboard: chessboard
  }
);

const historyButtons = new HistoryButtons(
  document.querySelector('#historyButtons'),
  {
    movesTable: ravMovesTable
  }
);

const gameActionsDropdown = new GameActionsDropdown(
  document.querySelector('#gameActionsDropdown ul'),
  {
    movesTable: ravMovesTable
  }
);

export const databaseAnnotatedGames = {
  modal: new Modal(document.getElementById('databaseAnnotatedGamesModal')),
  form: document.querySelector('#databaseAnnotatedGamesModal form')
}
