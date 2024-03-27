<?php

namespace App\Controller\Pages\Database;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class EventStatsController extends AbstractController
{
    public function index(): Response
    {
        return $this->render('pages/database/event_stats.html.twig');
    }
}
