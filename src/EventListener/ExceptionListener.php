<?php

namespace App\EventListener;

use App\Exception\NotTranslatedException;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use Twig\Environment;

class ExceptionListener
{
    private Environment $twig;

    public function __construct(Environment $twig)
    {
        $this->twig = $twig;
    }

    public function __invoke(ExceptionEvent $event)
    {
        $exception = $event->getThrowable();

        $response = new Response();

        if ($exception instanceof NotTranslatedException) {
            $response->setStatusCode(Response::HTTP_NOT_FOUND);
            $html = $this->twig->render('error/404/notTranslated.html.twig', [
                'message' => $exception->getMessage(),
                'hint' => 'Become an author today! Send your article at authors@chesslablab.org and it will published on the blog under the CC0 license',
            ]);
            $response->setContent($html);
        } else {
            $response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
        }


        $event->setResponse($response);
    }
}
