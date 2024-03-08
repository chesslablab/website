<?php

namespace App\Controller\Pages;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class SupportController extends AbstractController
{
    public function index(): Response
    {
        return $this->render('support.html.twig');
    }
}
