<?php

namespace App\Controller\Pages\Chessboard;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class FischerRandomController extends AbstractController
{
    public function index(): Response
    {
        return $this->render('chessboard/fischer_random.html.twig');
    }
}
