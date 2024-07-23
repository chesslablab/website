<?php

namespace App\Controller\Iframes;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class AnalysisController extends AbstractController
{
    public function index(Request $request): Response
    {
        return $this->render('iframes/analysis/index.html.twig');
    }
}
