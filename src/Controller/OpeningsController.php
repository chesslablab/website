<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class OpeningsController extends AbstractController
{
    public function index(): Response
    {
        return $this->render('openings/index.html.twig');
    }
}
