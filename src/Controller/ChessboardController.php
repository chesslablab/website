<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class ChessboardController extends AbstractController
{
    public function index(): Response
    {
        return $this->render('chessboard/classical.html.twig');
    }

    public function fischerRandom(): Response
    {
        return $this->render('chessboard/fischer_random.html.twig');
    }
}
