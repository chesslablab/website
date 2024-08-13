<?php

namespace App\Controller\Pages\Openings;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class TopController extends AbstractController
{
    public function index(): Response
    {
        return $this->render('pages/openings/top/index.html.twig');
    }
}
