Foto de [Fili Santillán](https://unsplash.com/@filisantillan?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) en [Unsplash](https://unsplash.com/photos/a-computer-screen-with-a-bunch-of-code-on-it-1HCb2gPk3ik?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)

Este es un blog estático simple hecho con Symfony y Twig. El filtro `markdown_to_html` se utiliza para convertir un bloque de Markdown a HTML. Todo funciona bien aunque parece que no se pueden insertar imágenes en documentos Markdown.

Al "compilar" los activos con el componente [AssetMapper](https://symfony.com/doc/current/frontend/asset_mapper.html), se agregará automáticamente un hash a los nombres de archivos para fines de control de versiones, como en el ejemplo siguiente.

- /assets/images/product-3c16d9220694c0e56d8648f25e6035e9.jpg

Esto significa que simplemente no sabes de antemano el nombre del archivo que deseas insertar en el documento de Markdown.

Entonces, me pregunto si es posible "compilar" los activos sin versionar los archivos para que los nombres de los archivos generados en la carpeta pública sigan siendo exactamente los mismos que en la carpeta de activos.

- /assets/images/product.jpg

Ver:

- [A question on the AssetMapper component](https://github.com/symfony/symfony-docs/issues/19863)

Por ahora, la solución más sencilla es simplemente colocar las imágenes del blog en el directorio público en lugar del directorio de activos para que luego se haga referencia a ellas en los documentos de Markdown.

Después de algunas semanas de probar la implementación actual del blog, parece que todo está bien. Las herramientas de análisis SEO ayudan a realizar un seguimiento del rendimiento del sitio web y mejorarlo. Recuerde, se recomienda utilizar al menos 250 palabras por página para brindar información útil.

¡Muchas gracias por leer y estad atentos!
