<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class DatabaseController extends AbstractController
{
    public function annotatedGames(): Response
    {
        return $this->render('database/annotated_games.html.twig');
    }
}
