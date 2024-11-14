<?php

namespace App\Controller\Pages;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class ConsoleController extends AbstractController
{
    public function index(): Response
    {
        return $this->render('pages/console/index.html.twig');
    }
}
