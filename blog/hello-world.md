Photo by [Fili Santillán](https://unsplash.com/@filisantillan?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/a-computer-screen-with-a-bunch-of-code-on-it-1HCb2gPk3ik?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)

This is a simple static blog made with Symfony and Twig. The `markdown_to_html` filter is used to convert a block of Markdown to HTML. Everything is working okay although it seems that images cannot be inserted into Markdown documents.

When "compiling" the assets with the [AssetMapper](https://symfony.com/doc/current/frontend/asset_mapper.html) component, a hash will automatically be appended to the filenames for versioning purposes like in the example below.

- /assets/images/product-3c16d9220694c0e56d8648f25e6035e9.jpg

This means that you just don't know beforehand the name of the file that you want to insert in the Markdown document.

So, I am wondering if it is possible to "compile" the assets without versioning the files so that the file names generated in the public folder are still the exact same ones as in the asset folder.

- /assets/images/product.jpg

See:

- [A question on the AssetMapper component](https://github.com/symfony/symfony-docs/issues/19863)

For now, the simplest solution is to simply put the blog images in the public directory as opposed to the assets directory for them to then be referenced in the Markdown documents.

After a few weeks of testing the current blog implementation, it seems that everything is fine. SEO analysis tools are helping to track the website's performance and improve it. It is recommended to use at least 250 words per page to provide useful information.

Thank you so much for reading, and stay tuned!
