<?php

namespace App\Controller\Pages\Play;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class OnlineController extends AbstractController
{
    public function index(): Response
    {
        return $this->render('pages/play/online/index.html.twig');
    }
}
