<?php

namespace App\Controller\Pages;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class AnnotationsController extends AbstractController
{
    public function index(): Response
    {
        return $this->render('pages/annotations/index.html.twig', [
            'entrypoint' => 'js/pages/annotations/index.js',
        ]);
    }
}
