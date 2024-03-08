<?php

namespace App\Controller\Pages;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class LegalController extends AbstractController
{
    public function index(): Response
    {
        return $this->render('legal.html.twig');
    }
}
