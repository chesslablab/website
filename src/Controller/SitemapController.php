<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Yaml\Yaml;

class SitemapController extends AbstractController
{
    public function index(): Response
    {
        $urls = [
            ...$this->urls(Yaml::parseFile("../config/routes.yaml")),
            ...$this->urls(Yaml::parseFile("../config/routing/blog.yaml")),
        ];

        $response = new Response(
            $this->renderView('/sitemap.xml.twig', ['urls' => $urls]),
            200
        );

        $response->headers->set('Content-Type', 'text/xml');

        return $response;
    }

    protected function urls($routes)
    {
        $urls = [];
        foreach ($routes as $key => $val) {
            if (isset($val['requirements'])) {
                if (isset($val['options']['sitemap'])) {
                    if ($val['options']['sitemap']['_locale'] !== false) {
                        $locale = explode('|', $val['options']['sitemap']['_locale']);
                        foreach ($locale as $item) {
                            $urls[] = [
                                'loc' => $this->generateUrl($key, ['_locale' => $item], UrlGeneratorInterface::ABSOLUTE_URL),
                                'changefreq' => 'weekly',
                                'priority' => '0.5',
                            ];
                        }
                    }
                }
            }
        }

        return $urls;
    }
}
