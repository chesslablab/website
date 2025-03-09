<?php

namespace App\Controller\Pages\SignIn;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class RegisterController extends AbstractController
{
    public function index(): Response
    {
        return $this->render('pages/signin/register/index.html.twig', [
            'entrypoint' => 'js/pages/signin/register/index.js',
        ]);
    }
}
