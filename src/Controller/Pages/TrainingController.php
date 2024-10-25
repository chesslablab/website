<?php

namespace App\Controller\Pages;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class TrainingController extends AbstractController
{
    public function index(): Response
    {
        return $this->render('pages/training/index.html.twig');
    }
}
