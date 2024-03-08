<?php

namespace App\Controller\Pages\Chessboard;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class FenStringController extends AbstractController
{
    public function index(): Response
    {
        return $this->render('chessboard/fen_string.html.twig');
    }
}
