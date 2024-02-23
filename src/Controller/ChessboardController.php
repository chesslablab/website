<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class ChessboardController extends AbstractController
{
    public function classical(): Response
    {
        return $this->render('chessboard/classical.html.twig');
    }

    public function fischerRandom(): Response
    {
        return $this->render('chessboard/fischer_random.html.twig');
    }

    public function sanMovetext(): Response
    {
        return $this->render('chessboard/san_movetext.html.twig');
    }

    public function fenString(): Response
    {
        return $this->render('chessboard/fen_string.html.twig');
    }
}
