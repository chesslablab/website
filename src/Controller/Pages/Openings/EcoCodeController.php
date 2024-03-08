<?php

namespace App\Controller\Pages\Openings;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class EcoCodeController extends AbstractController
{
    public function index(): Response
    {
        return $this->render('pages/openings/eco_code.html.twig');
    }
}
