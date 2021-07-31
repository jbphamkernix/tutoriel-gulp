# Tutoriel Gulp

## Présentation
**Gulp est un "automatiseur de tâches". C'est un exécuteur de tâches construit sur Node.js et npm, utilisé pour l'automatisation des tâches répétitives dans le développement web :**
- **Automatisation** - gulp est une boîte à outils qui vous aide à automatiser les tâches fastidieuses ou chronophages de votre workflow de développement.
- **Intégrations dans un IDE** - Gulp peut être intégrer dans tous les principaux IDE et les développeurs peuvent utiliser gulp dans des projets PHP, .NET, Node.js, Java et d'autres plates-formes.
- **Écosystème fort** - Utilisez les modules npm pour faire tout ce que vous voulez + plus de 3000 plugins organisés.
- **Simple** - En ne fournissant qu'une surface API minimale, gulp est facile à apprendre et simple à utiliser.


## Pré-requis
Pour commencer à utiliser Gulp, il faut préalablement installer Node.js et Gulp.

**Node.js** est un environnement JavaScript qui compte parmi les projets de Linux et qui est doté d'un vaste écosystème de plugins nommé "npm" afin de pouvoir exécuter Gulp.
- Installer [node.js](https://nodejs.org/en/) par [homebrew](https://brew.sh/index_fr)

**Gulp**
- Installer [gulp](https://gulpjs.com/docs/en/getting-started/quick-start) en général.
```
npm install gulp -g
```

## Gulp dans un projet
**Structure du projet :**
- **src** : dossier de travail, où sont contenus les fichiers .sass et js de développement
- **dist** : dossier de production, où seront créés les fichiers produits par Gulp (ce dossier sera généré, il n'est pas utile qu'il soit présent au départ du projet)
```
[tutoriel-gulp]
  |-- [dist]
        |-- [js]
        |-- [css]
              |-- main.min.css
        |-- [img]
  |-- [src]
        |-- [js]
        |-- [sass]
              |-- main.scss
        |-- [img]        
  |-- .gitignore
  |-- gulpfile.js
  |-- index.html
  |-- package-lock.json
  |-- package.json  
  |-- README.md
-
```

### Initialisation du projet
#### Le fichier package.json
Le **package.json** est un fichier qui se trouve à la base de votre projet qui permet de fournir tout type d'informations sur le projet et contient la liste des plugins gulp (ou autres) nécessaires à vos tâches. Il peut être créer à partir de zéro ou lançant la commande dans votre terminal de commande dans votre dossier de projet :
```
npm init
```
**npm** vous demandera plein d'informations (nom du projet, licence, etc.), le plus simple est généralement de valider point par point en confirmant avec la touche **Entrée**.

L'étape suivante est alors de déclarer et d'installer un par un chaque plugin qui sera nécessaire pour votre projet, en commençant par exemple par Gulp lui-même :
```
npm install gulp --save-dev
```
... et ainsi de suite pour chaque plugin.
```
npm install nom_du_plugin --save-dev
```

Pour installer le projet avec le package.json avec vos plugins sur un autre ordinateur ou environnement, lancer la commande :
```
npm install
```

#### Le fichier gulpfile.js
Le **gulpfile.js** contient la liste des tâches pouvant être exécutée.

### Gulp SASS
Installation d'un base pour utiliser créer une tâches SASS pour créer le fichier CSS final. Ces plugins ne sont qu'une base mais que vous pouvez compléter selon vos besoins :
```
npm install autoprefixer gulp-clean-css gulp-notify postcss gulp-postcss gulp-rename sass gulp-sass --save-dev
```

**CSS plugins :**
- **sass** : Binaire pour la compilation du SCSS en CSS
- **gulp-sass** : Compiler SCSS en CSS
- **autoprefixer** : Préfixeur CSS
- **postcss** : Binaire du PostCSS qui est un outil qui va permettre de transformer le CSS à travers différents plug-ins JavaScript. Ces plug-ins peuvent effectuer différentes transformations (réorganiser le code, créer des variables, ajouter des propriétés...)
- **gulp-postcss** : Plugin PostCSS gulp
- **gulp-clean-css** : Plugin pour nettoyer le CSS (ex: supprimer les commentaires)
- **gulp-rename** : Plugin qui fournit des méthodes simples de renommage de fichiers
- **gulp-notify** : Plugin de notification

Appeller les constantes (variables) & les scripts pour le SASS :
```
const { src, dest, watch, parallel, series } = require("gulp");
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");
const notify = require("gulp-notify");

function sassFront() {
  return src('./src/sass/**/*.scss')
  .pipe(sass().on('error', notify.onError(function (error) {
     return  error;
  })))
  .pipe(postcss([
    autoprefixer({
      overrideBrowserslist: ['last 3 version']
    })
  ]))
  .pipe(cleanCSS({level: {1: {specialComments: 0}}}))
  .pipe(rename({ suffix: ".min" }))
  .pipe(dest('./dist/css'));
};

exports.sassFront = sassFront;
```

**Le fichier CSS sera alors généré dans le dossier `./dist/css` avec toute la configuration pour optimiser le CSS lors de la compilation du SASS.**

### Gulp JS
Installation d'un base pour utiliser créer une tâches JS pour créer le fichier JS final. Ce plugins n'est qu'une base mais que vous pouvez compléter selon vos besoins :
```
npm install gulp-uglify --save-dev
```

const uglify = require('gulp-uglify');
Appeller les constantes (variables) & les scripts pour le SASS :
```
const uglify = require('gulp-uglify');

function jsFront() {
  return src('./src/js/**/*.js')
  .pipe(uglify())
  .pipe(rename({ suffix: ".min" }))
  .pipe(dest('./dist/js'));
};

exports.jsFront = jsFront;
```

**Le fichier JS sera alors généré dans le dossier `./dist/js` avec toute la configuration pour optimiser le JS lors de la compilation du JS final.**

### Gulp Watch et Default
#### Gulp Watch
Rajouter à la fin du gulpfile.js
```
exports.watch = function () {
  watch('./src/sass/**/*.scss', series('sassFront'));
  watch('./src/js/**/*.js', series('jsFront'));
};
```
Cette commande permet de scruter les changements, puis d’exécuter la méthode associée.


#### Gulp Default
Rajouter à la fin du gulpfile.js.
```
exports.default = series(parallel(sassFront, jsFront));

```
Cette commande sert à lancer les tâches gulp par défaut.
```
gulp

```

## Gulp, un "automatiseur de tâches" puissant et simple
> Gulp est un outil qui permet l'automatisation des tâches répétitives dans le développement web sur différents environnements de travail(dev ou prod) ou sur différents systèmes(serveur, mac, windows,...).

## Liens
https://gulpjs.com/

https://www.alsacreations.com/tuto/lire/1686-introduction-a-gulp.html

https://la-cascade.io/gulp-pour-les-debutants/
