<?php

namespace App\Controller\Pages\Openings;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class ByEventController extends AbstractController
{
    public function index(): Response
    {
        return $this->render('pages/openings/by_event/index.html.twig');
    }
}
