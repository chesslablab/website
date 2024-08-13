<?php

namespace App\Controller\Pages\Openings;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class TopOpeningsController extends AbstractController
{
    public function index(): Response
    {
        return $this->render('pages/openings/top_openings/index.html.twig');
    }
}
