<?php

namespace App\Controller\Pages\Learn;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class DunsanyController extends AbstractController
{
    public function index(): Response
    {
        return $this->render('pages/learn/dunsany/index.html.twig');
    }
}
