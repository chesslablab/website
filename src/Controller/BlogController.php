<?php

namespace App\Controller;

use App\Exception\NotTranslatedException;
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
        $locale = $request->attributes->get('_locale');
        $routes = Yaml::parseFile('../config/routing/blog.yaml');

        if (isset($routes[$request->attributes->get('_route')]['options']['blog'][$locale])) {
            $metadata = $routes[$request->attributes->get('_route')]['options']['blog'][$locale]['metadata'];
        } else {
            throw new NotTranslatedException('The content of this page has not been translated.');
        }

        $posts = [];
        foreach ($routes as $key => $val) {
            if (str_starts_with($key, 'blog_')) {
                $posts[] = [
                    'url' => $this->generateUrl(
                        $key,
                        ['_locale' => $request->getLocale()],
                        UrlGeneratorInterface::ABSOLUTE_URL
                    ),
                    'metadata' => [
                        'title' => $val['options']['blog'][$locale]['metadata']['title'],
                        'description' => $val['options']['blog'][$locale]['metadata']['description'],
                    ],
                    'content' => [
                        'subtitle' => $val['options']['blog'][$locale]['content']['subtitle'],
                        'image' => $val['options']['blog'][$locale]['content']['image'],
                        'date' => $val['options']['blog'][$locale]['content']['date'],
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
        $locale = $request->attributes->get('_locale');
        $routes = Yaml::parseFile('../config/routing/blog.yaml');

        if (isset($routes[$request->attributes->get('_route')]['options']['blog'][$locale])) {
            $metadata = $routes[$request->attributes->get('_route')]['options']['blog'][$locale]['metadata'];
            $content = $routes[$request->attributes->get('_route')]['options']['blog'][$locale]['content'];
        } else {
            throw $this->createNotFoundException('This post does not exist');
        }

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
                $locale . '/' .
                basename($routes[$request->attributes->get('_route')]['path']) . '.md'
            )
        ]);
    }
}
