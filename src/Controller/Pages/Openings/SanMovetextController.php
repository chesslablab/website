<?php

namespace App\Controller\Pages\Openings;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class SanMovetextController extends AbstractController
{
    public function index(): Response
    {
        return $this->render('pages/openings/san_movetext/index.html.twig');
    }
}
