<?php

namespace App\Controller\Pages\Learn;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class RavMovetextController extends AbstractController
{
    public function index(): Response
    {
        return $this->render('pages/learn/rav_movetext.html.twig');
    }
}
