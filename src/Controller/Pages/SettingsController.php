<?php

namespace App\Controller\Pages;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class SettingsController extends AbstractController
{
    public function index(): Response
    {
        return $this->render('pages/settings/index.html.twig', [
            'entrypoint' => 'js/pages/settings/index.js',
        ]);
    }
}
