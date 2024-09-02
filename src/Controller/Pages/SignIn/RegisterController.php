<?php

namespace App\Controller\Pages\SignIn;

use App\Utils\RandomUsername;
use OTPHP\InternalClock;
use OTPHP\TOTP;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class RegisterController extends AbstractController
{
    public function index(): Response
    {
        $username = (new RandomUsername())->generate();

        $otp = TOTP::createFromSecret($_ENV['TOTP_SECRET'], new InternalClock());
        $otp->setDigits(9);
        $otp->setLabel($username);
        $otp->setIssuer('ChesslaBlab');
        $otp->setParameter('image', 'https://chesslablab.org/logo.png');

        $grCodeUri = $otp->getQrCodeUri(
            'https://api.qrserver.com/v1/create-qr-code/?data=[DATA]&size=300x300&ecc=M',
            '[DATA]'
        );

        return $this->render('pages/sign_in/register/index.html.twig', ['username' => $username, 'grCodeUri' => $grCodeUri]);
    }
}
