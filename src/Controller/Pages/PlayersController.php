<?php

namespace App\Controller\Pages;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class PlayersController extends AbstractController
{
    public function index(): Response
    {
        return $this->render('pages/players.html.twig');
    }
}
