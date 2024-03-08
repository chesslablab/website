<?php

namespace App\Controller\Pages\Database;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class AnnotatedGamesController extends AbstractController
{
    public function index(): Response
    {
        return $this->render('database/annotated_games.html.twig');
    }
}
