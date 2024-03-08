<?php

namespace App\Controller\Pages\Chessboard;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class ClassicalController extends AbstractController
{
    public function index(): Response
    {
        return $this->render('pages/chessboard/classical.html.twig');
    }
}
