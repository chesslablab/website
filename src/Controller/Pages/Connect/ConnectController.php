<?php

namespace App\Controller\Pages\Connect;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class ConnectController extends AbstractController
{
    public function index(): Response
    {
        return $this->render('pages/connect/index.html.twig');
    }
}
