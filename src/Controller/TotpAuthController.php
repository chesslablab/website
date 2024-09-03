<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class TotpAuthController extends AbstractController
{
    public function signin(Request $request): Response
    {
        $params = json_decode($request->getContent(), true);
        $request->getSession()->set('username', $params['username']);
        $cookie = Cookie::create(
            'ui',
            json_encode([
                'username' => $params['username'],
            ])
        );
        $response = new Response('', Response::HTTP_NO_CONTENT);
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
