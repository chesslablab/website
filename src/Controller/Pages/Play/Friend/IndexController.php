<?php

namespace App\Controller\Pages\Play\Friend;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class IndexController extends AbstractController
{
    public function index(): Response
    {
        return $this->render('play/friend/index.html.twig');
    }
}
