<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class FooterController extends AbstractController
{
    public function about(): Response
    {
        return $this->render('footer/about.html.twig');
    }

    public function support(): Response
    {
        return $this->render('footer/support.html.twig');
    }

    public function legal(): Response
    {
        return $this->render('footer/legal.html.twig');
    }
}
