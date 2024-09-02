<?php

namespace App\Controller\Pages\SignIn;

use OTPHP\InternalClock;
use OTPHP\TOTP;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class AuthenticateController extends AbstractController
{
    public function index(): Response
    {
        echo 'TODO ...';

        exit;
    }
}
