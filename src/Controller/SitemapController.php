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
        $urls = [];
        $routes = Yaml::parseFile("../config/routes.yaml");
        foreach ($routes as $key => $val) {
            if (isset($val['requirements'])) {
                $locale = explode('|', $val['requirements']['_locale']);
                if (!isset($val['options']['sitemap'])) {
                    foreach ($locale as $item) {
                        $urls[] = [
                            'loc' => $this->generateUrl($key, array('_locale' => $item), UrlGeneratorInterface::ABSOLUTE_URL),
                            'changefreq' => 'weekly',
                            'priority' => '0.5',
                        ];
                    }
                }
            }
        }

        $response = new Response(
            $this->renderView('/sitemap.html.twig', ['urls' => $urls]),
            200
        );

        $response->headers->set('Content-Type', 'text/xml');

        return $response;
    }
}
