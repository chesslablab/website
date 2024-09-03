<?php

namespace App\Controller\Pages\SignOut;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class SignOutController extends AbstractController
{
    public function index(Request $request): Response
    {
        $request->getSession()->clear();
        $response = new RedirectResponse($this->generateUrl('pages_sign_in'));
        $response->headers->clearCookie('username');

        return $response;
    }
}
