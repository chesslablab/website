<?php

namespace App\Controller\Pages;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class GamesController extends AbstractController
{
    public function index(): Response
    {
        return $this->render('pages/games/index.html.twig', [
            'entrypoint' => 'js/pages/games/index.js',
        ]);
    }
}
