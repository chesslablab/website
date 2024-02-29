<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class PlayController extends AbstractController
{
    public function computer(): Response
    {
        return $this->render('play/computer.html.twig');
    }

    public function friend(): Response
    {
        return $this->render('play/friend/index.html.twig');
    }

    public function enterInviteCode(): Response
    {
        return $this->render('play/friend/enter_invite_code.html.twig');
    }
}
