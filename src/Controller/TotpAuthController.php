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
        $cookie = Cookie::create(
            'ui',
            json_encode([
                'username' => $params['username'],
                'elo' => $params['elo'],
            ]),
            time() + (2 * 365 * 24 * 60 * 60), // expires in 2 years
            '/', // path
            null, // domain
            true, // secure
            false // http only
        );
        $response = new Response('', Response::HTTP_NO_CONTENT);
        $response->headers->setCookie($cookie);

        return $response;
    }

    public function signout(Request $request): Response
    {
        $response = new RedirectResponse($this->generateUrl('pages_signin'));
        $response->headers->clearCookie('ui');

        return $response;
    }
}
