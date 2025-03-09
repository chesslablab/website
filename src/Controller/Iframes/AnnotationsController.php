<?php

namespace App\Controller\Iframes;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class AnnotationsController extends AbstractController
{
    public function index(Request $request): Response
    {
        return $this->render('iframes/annotations/index.html.twig', [
            'entrypoint' => 'js/iframes/annotations/index.js',
        ]);
    }
}
