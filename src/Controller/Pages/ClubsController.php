<?php

namespace App\Controller\Pages;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class ClubsController extends AbstractController
{
    public function index(): Response
    {
        return $this->render('pages/clubs.html.twig');
    }
}
