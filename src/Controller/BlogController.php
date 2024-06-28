<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Yaml\Yaml;

class BlogController extends AbstractController
{
    const DATA_FOLDER = __DIR__ . '/../../blog';

    public function index(Request $request): Response
    {
        $posts = [];
        $routes = Yaml::parseFile("../config/routing/blog.yaml");
        $metadata = $routes[$request->attributes->get('_route')]['options']['blog']['metadata'];
        foreach ($routes as $key => $val) {
            if (str_starts_with($key, 'blog_')) {
                $posts[] = [
                    'url' => $this->generateUrl(
                        $key,
                        ['_locale' => $request->getLocale()],
                        UrlGeneratorInterface::ABSOLUTE_URL
                    ),
                    'metadata' => [
                        'title' => $val['options']['blog']['metadata']['title'],
                        'description' => $val['options']['blog']['metadata']['description'],
                    ],
                    'content' => [
                        'subtitle' => $val['options']['blog']['content']['subtitle'],
                        'image' => $val['options']['blog']['content']['image'],
                        'date' => $val['options']['blog']['content']['date'],
                    ],
                ];
            }
        }

        usort($posts, function ($a, $b) {
            return strcmp($b['content']['date'], $a['content']['date']);
        });

        return $this->render('blog.html.twig', [
            'metadata' => [
                'title' => $metadata['title'],
                'description' => $metadata['description'],
            ],
            'posts' => $posts,
        ]);
    }

    public function entry(Request $request): Response
    {
        $routes = Yaml::parseFile("../config/routing/blog.yaml");
        $metadata = $routes[$request->attributes->get('_route')]['options']['blog']['metadata'];
        $content = $routes[$request->attributes->get('_route')]['options']['blog']['content'];

        return $this->render('entry.html.twig', [
            'metadata' => [
                'title' => $metadata['title'],
                'description' => $metadata['description'],
            ],
            'content' => [
                'subtitle' => $content['subtitle'],
                'image' => $content['image'],
                'date' => date('F, Y', strtotime($content['date'])),
            ],
            'post' => file_get_contents(
                self::DATA_FOLDER . '/' .
                $request->attributes->get('_locale') . '/' .
                basename($routes[$request->attributes->get('_route')]['path']) . '.md'
            )
        ]);
    }
}
