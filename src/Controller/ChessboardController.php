<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class ChessboardController extends AbstractController
{
    public function index(): Response
    {
        $fooBar = 'foobar';
        return $this->render('chessboard/classical.html.twig', [
            'foo_bar' => $fooBar,
        ]);
    }
}
