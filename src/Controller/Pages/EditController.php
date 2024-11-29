<?php

namespace App\Controller\Pages;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class EditController extends AbstractController
{
    public function index(): Response
    {
        return $this->render('pages/edit.html.twig', [
            'entrypoint' => 'js/pages/edit/index.js',
        ]);
    }
}
