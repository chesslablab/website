<?php

namespace App\Controller\Pages\Learn;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class AnnotatedGamesController extends AbstractController
{
    public function index(): Response
    {
        return $this->render('pages/database/annotated_games.html.twig');
    }
}
