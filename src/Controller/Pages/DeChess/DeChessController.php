<?php

namespace App\Controller\Pages\DeChess;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class DeChessController extends AbstractController
{
    public function index(): Response
    {
        return $this->render('pages/dechess/index.html.twig');
    }
}
