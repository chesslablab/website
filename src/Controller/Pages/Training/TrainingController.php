<?php

namespace App\Controller\Pages\Play;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class TrainingController extends AbstractController
{
    public function index(): Response
    {
        return $this->render('pages/play/training.html.twig');
    }
}
