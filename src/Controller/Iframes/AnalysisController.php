<?php

namespace App\Controller\Iframes;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class AnalysisController extends AbstractController
{
    public function index(Request $request): Response
    {
        $variant = $request->attributes->get('variant');
        $fen = $request->attributes->get('fen');
        $movetext = $request->attributes->get('movetext');
        $startPos = $request->attributes->get('startPos');

        return $this->render('iframes/analysis/index.html.twig', [
            'variant' => $variant,
            'fen' => $fen,
            'movetext' => $movetext,
            'startPos' => $startPos,
        ]);
    }
}
