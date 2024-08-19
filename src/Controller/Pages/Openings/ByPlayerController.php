<?php

namespace App\Controller\Pages\Openings;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class ByPlayerController extends AbstractController
{
    public function index(): Response
    {
        return $this->render('pages/openings/by_player/index.html.twig');
    }
}
