<?php

namespace App\Controller\Pages\SignIn;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class SignInController extends AbstractController
{
    public function index(): Response
    {
        return $this->render('pages/signin/index.html.twig');
    }
}
