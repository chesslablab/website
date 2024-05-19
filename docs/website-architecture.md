# Website Architecture

The ChesslaBlab website is a multi-page application (MPA) that is not adhering to the MVC architectural pattern. The controller actions are basically sending an HTML document to the browser on each request with the business logic being split between the chess server and the chess API.

The structure of the [App\Controller\Pages](src/Controller/Pages) namespace is mirroring the structure of the [templates/pages](https://github.com/chesslablab/website/tree/main/templates/pages) folder as well as the structure of the [assets/js/pages](https://github.com/chesslablab/website/tree/main/assets/js/pages) folder.
