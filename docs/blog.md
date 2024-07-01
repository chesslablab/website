# Blog

A static SEO-optimized blog has been set up to allow chess content creators to share stories with the world. A static blog differs from a dynamic blog in that the content is stored in Markdown files as opposed to in a database.

![Figure 1](https://raw.githubusercontent.com/chesslablab/website/main/docs/blog_01.png)

**Figure 1**. Click on **Blog**

The posts are stored in the file system in the [blog](https://github.com/chesslablab/website/tree/main/blog) folder. Two sample posts are provided in two languages: [English](https://github.com/chesslablab/website/tree/main/blog/en) and [Spanish](https://github.com/chesslablab/website/tree/main/blog/es). The [sitemap.xml](https://github.com/chesslablab/website/blob/main/src/Controller/SitemapController.php) file is generated on request based on the routes defined in the [config/routing/blog.yaml](https://github.com/chesslablab/website/blob/main/config/routing/blog.yaml) file.

As you can see, all blog routes are prefixed with the word `blog`. The blog.yaml file is intended to encode the metadata of the posts into multiple languages.
