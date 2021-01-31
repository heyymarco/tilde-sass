# tilde-sass

**tilde-sass** is a SASS compiler with tilde (~) support for resolving **node_modules** path and supports new sass' syntax.

## Features
* Supports a tilde (~) prefix for resolving **node_modules** path.
* Supports new sass' syntax like @use, @forward, sass modules, etc. Based on **dart-sass**.
* Supports better compression using postcss and cssnano.
* Supports merge similar selectors using postcss-merge-selectors.

## Installation

```sh
npm i tilde-sass --save-dev
```

## Usage

Add this scripts into your **package.json**

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "compile": "tilde-sass --file src/*.scss --outFile dist/ --mergeSelectors",
    "compile-min": "tilde-sass --file src/*.scss --outFile dist/ --mergeSelectors --outputStyle compressed",
    "compile-watch": "tilde-sass --file src/*.scss --outFile dist/ --mergeSelectors --outputStyle compressed --watch"
}
```

```sh
npm run compile
```

```scss
@use "~@heymarco/colors/src/index" as color with ($var-prefix: "col");
@use "~@heymarco/icons/src/index" as icon;
@import "~some-lib/src/awesome";
@import "./my-style";
```

## Compression Options
add **--outputStyle compressed** for outputing a compressed css.
For further compression options add this following code into your **package.json**
```json
"cssnano": {
    "preset": [
      "default",
      {
        "cssDeclarationSorter": true,
        "rawCache": true,
        "calc": true,
        "colormin": true,
        "convertValues": true,
        "discardComments": true,
        "discardDuplicates": true,
        "discardEmpty": true,
        "discardOverridden": true,
        "mergeLonghand": true,
        "mergeRules": true,
        "minifyFontValues": true,
        "minifyGradients": true,
        "minifyParams": true,
        "minifySelectors": true,
        "normalizeCharset": true,
        "normalizeDisplayValues": true,
        "normalizePositions": true,
        "normalizeRepeatStyle": true,
        "normalizeString": true,
        "normalizeTimingFunctions": true,
        "normalizeUnicode": true,
        "normalizeUrl": true,
        "normalizeWhitespace": true,
        "orderedValues": true,
        "reduceInitial": true,
        "reduceTransforms": true,
        "svgo": true,
        "uniqueSelectors": true
      }
    ]
  }
```
To disable any compression options set the value to false.
For example, disabling the **calc compression** and **discardComments compression**:
```json
"cssnano": {
    "preset": [
      "default",
      {
        "calc": false,
        "discardComments": false
      }
    ]
  }
```

## Merging Similar Rules
Do you hate using **@extend** for combining some rules together?
An **@extend** doesn't work if you merge some rules with different **media queries**.
Sometimes you must using **@include** instead of @extend.
That makes our SASS code complicated and not consistent.

The solution is by using the **@include** only (forget the @extend)
and then add --mergeSelectors at your command line.
Our compiler will **merge** any rules having the same (or partially) properties for you!

Example:
```scss
$my-color: rgba(255, 0, 0, 1);

.a {
    color: red;
}
.b {
    color: #ff0000;
}
.c {
    color: blue;
    background: white;
}
.d {
    color: $my-color;
}
```

Then run:
tilde-sass --file test/*.scss --outFile test/  --outputStyle compressed --mergeSelectors

The compiled css would be like this:
```css
.a, .b, .d
{
    color: red;
}

.c
{
    background: #fff;
    color: #00f;
}
```

## Please Support Us
A lot of coffee has been spent for making this plugins.
Please buy me a cup of coffee to support me continue to develop & improve this application.
Visit: [ko-fi.com](https://ko-fi.com/heymarco)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)