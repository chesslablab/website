<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class TotpAuthController extends AbstractController
{
    public function signout(Request $request): Response
    {
        $response = new RedirectResponse($this->generateUrl('pages_signin'));
        $response->headers->clearCookie('access_token');

        return $response;
    }
}
