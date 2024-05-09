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
        $routes = Yaml::parseFile("../config/routes.yaml");
        $metadata = $routes[$request->attributes->get('_route')]['options']['blog']['metadata'];
        $md = '';
        foreach ($routes as $key => $val) {
            if (str_starts_with($key, 'blog_')) {
                $url = $this->generateUrl($key, ['_locale' => $request->getLocale()], UrlGeneratorInterface::ABSOLUTE_URL);
                $md .= "### [{$val['options']['blog']['metadata']['title']}]($url)" . PHP_EOL;
                $md .= "#### {$val['options']['blog']['content']['subtitle']}" . PHP_EOL;
                $md .= "###### {$val['options']['blog']['content']['date']}" . PHP_EOL;
                $md .= "---" . PHP_EOL;
            }
        }

        return $this->render('post.html.twig', [
            'title' => $metadata['title'],
            'description' => $metadata['description'],
            'content' => $md,
        ]);
    }

    public function hello_world(Request $request): Response
    {
        $routes = Yaml::parseFile("../config/routes.yaml");
        $metadata = $routes[$request->attributes->get('_route')]['options']['blog']['metadata'];
        $content = $routes[$request->attributes->get('_route')]['options']['blog']['content'];
        $md = "### {$metadata['title']}" . PHP_EOL;
        $md .= "#### {$content['subtitle']}" . PHP_EOL;
        $md .= "###### {$content['date']}" . PHP_EOL;
        $md .= file_get_contents(self::DATA_FOLDER . '/hello-world.md');

        return $this->render('post.html.twig', [
            'title' => $metadata['title'],
            'description' => $metadata['description'],
            'content' => $md,
        ]);
    }
}
