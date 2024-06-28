<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Yaml\Yaml;

class RobotsController extends AbstractController
{
    public function index(): Response
    {
        $paths = [
            ...$this->paths(Yaml::parseFile("../config/routes.yaml")),
        ];

        $response = new Response(
            $this->renderView('/robots.txt.twig', ['paths' => $paths]),
            200
        );

        $response->headers->set('Content-Type', 'text/plain');

        return $response;
    }

    protected function paths($routes)
    {
        $paths = [];
        foreach ($routes as $key => $val) {
            if (isset($val['requirements'])) {
                $requirmentsLocale = explode('|', $val['requirements']['_locale']);
                if (isset($val['options']['sitemap'])) {
                    $sitemapLocale = explode('|', $val['options']['sitemap']['_locale']);
                    $diffLocale = array_diff($requirmentsLocale, $sitemapLocale);
                    foreach ($diffLocale as $item) {
                        $url = $this->generateUrl($key, ['_locale' => $item], UrlGeneratorInterface::ABSOLUTE_URL);
                        $paths[] = parse_url($url, PHP_URL_PATH);
                    }
                }
            }
        }

        return $paths;
    }
}
