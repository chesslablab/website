<?php

namespace App\Controller\Pages\Openings;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class MostPlayedController extends AbstractController
{
    public function index(): Response
    {
        return $this->render('pages/openings/most_played/index.html.twig');
    }
}
