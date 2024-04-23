<?php

namespace App\Controller\Pages\Database;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class TopOpeningsController extends AbstractController
{
    public function index(): Response
    {
        return $this->render('pages/database/top_openings/index.html.twig');
    }
}
