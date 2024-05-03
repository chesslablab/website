<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class PostController extends AbstractController
{
    const DATA_FOLDER = __DIR__ . '/../../posts';

    public function hello_world(): Response
    {
        $content = file_get_contents(self::DATA_FOLDER . '/hello-world.md');

        return $this->render('post.html.twig', [
            'title' => 'Hello World!',
            'description' => 'This is my first post.',
            'content' => $content,
        ]);
    }
}
