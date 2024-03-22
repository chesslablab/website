<?php

namespace App\Controller\Pages\Learn;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class SanMovetextController extends AbstractController
{
    public function index(): Response
    {
        return $this->render('pages/chessboard/san_movetext.html.twig');
    }
}
