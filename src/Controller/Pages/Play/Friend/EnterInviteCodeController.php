<?php

namespace App\Controller\Pages\Play\Friend;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class EnterInviteCodeController extends AbstractController
{
    public function index(): Response
    {
        return $this->render('play/friend/enter_invite_code.html.twig');
    }
}
