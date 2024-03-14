<?php

namespace App\Controller\Pages\Play\Online;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class IndexController extends AbstractController
{
    public function index(): Response
    {
        return $this->render('pages/play/online/index.html.twig');
    }
}
