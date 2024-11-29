<?php

namespace App\Controller\Pages\Play;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class ComputerController extends AbstractController
{
    public function index(): Response
    {
        return $this->render('pages/play/computer/index.html.twig', [
            'entrypoint' => 'js/pages/play/computer/index.js',
        ]);
    }
}
