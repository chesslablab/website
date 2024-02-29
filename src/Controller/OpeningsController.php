<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class OpeningsController extends AbstractController
{
    public function ecoCode(): Response
    {
        return $this->render('openings/eco_code.html.twig');
    }

    public function sanMovetext(): Response
    {
        return $this->render('openings/san_movetext.html.twig');
    }

    public function name(): Response
    {
        return $this->render('openings/name.html.twig');
    }
}
