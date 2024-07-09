<?php

namespace App\Controller\Pages\Learn;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class RacingKingsController extends AbstractController
{
    public function index(): Response
    {
        return $this->render('pages/learn/racing_kings/index.html.twig');
    }
}
