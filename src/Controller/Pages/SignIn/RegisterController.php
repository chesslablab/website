<?php

namespace App\Controller\Pages\SignIn;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class RegisterController extends AbstractController
{
    public function index(): Response
    {
        return $this->render('pages/sign_in/register/index.html.twig');
    }
}
