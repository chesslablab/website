<?php

namespace App\Controller\Pages\Play\Online;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class CreateGameController extends AbstractController
{
    public function index(): Response
    {
        return $this->render('pages/play/online/create_game.html.twig');
    }
}
