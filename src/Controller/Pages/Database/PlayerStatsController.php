<?php

namespace App\Controller\Pages\Database;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class PlayerStatsController extends AbstractController
{
    public function index(): Response
    {
        return $this->render('pages/database/player_stats.html.twig');
    }
}
