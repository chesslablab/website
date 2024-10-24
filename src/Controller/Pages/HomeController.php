<?php

namespace App\Controller\Pages;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class HomeController extends AbstractController
{
    public function index(): Response
    {
        return $this->render('pages/home/index.html.twig');
    }
}
