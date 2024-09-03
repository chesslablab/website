<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends AbstractController
{
    public function signin(Request $request): Response
    {
        $request->getSession()->set('username', $request->request->get('username'));
        $response = new RedirectResponse($this->generateUrl('pages_play_online'));
        $cookie = Cookie::create(
            'ui',
            json_encode([
                'username' => $request->request->get('username'),
            ])
        );
        $response->headers->setCookie($cookie);

        return $response;
    }

    public function signout(Request $request): Response
    {
        $request->getSession()->clear();
        $response = new RedirectResponse($this->generateUrl('pages_signin'));
        $response->headers->clearCookie('ui');

        return $response;
    }
}
