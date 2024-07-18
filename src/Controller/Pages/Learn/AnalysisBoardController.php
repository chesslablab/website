<?php

namespace App\Controller\Pages\Learn;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class AnalysisBoardController extends AbstractController
{
    public function index(): Response
    {
        return $this->render('pages/learn/analysis_board/index.html.twig');
    }
}
