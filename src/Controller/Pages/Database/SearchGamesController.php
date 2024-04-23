<?php

namespace App\Controller\Pages\Database;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class SearchGamesController extends AbstractController
{
    public function index(): Response
    {
        return $this->render('pages/database/search_games/index.html.twig');
    }
}
