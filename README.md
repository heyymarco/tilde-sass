# tilde-sass

**tilde-sass** is a SASS compiler with tilde (~) support for resolving **node_modules** path,
supports new sass' syntax, and has built in **crazy** compression & grouping rules/selectors.


## Features

* Supports a tilde (~) prefix for resolving **node_modules** path.
* Supports new sass' syntax like @use, @forward, sass modules, etc. Based on **dart-sass**.
* Supports better compression using **postcss** and **cssnano**. Not just removing whitespace!
* Supports merging fully/partially similar selectors using **postcss-merge-rules-plus**.


## Merging Similar Rules & Better Compression

Do you hate the **@extend**/**placeholder** cannot be used with **different media queries**?
An **@extend** doesn't work if you try to merge some properties with different **media queries**.
*Error: You may not @extend selectors across media queries.*

Sometimes you must using **@include** instead of **@extend**.
That makes our SASS code complicated and not consistent.

The solution is by using the **@include** only (forget the **@extend**),
and then run this compiler with option: **--mergeSelectors** at your command line.
Our compiler will **merge** any rules having the same (or partially) properties for you!
*The result will be the same* as if you using **@extend** in your SASS!
The exception is any rules having different media queries,
the result will be falled back to **@include** normally.


### Example:

```scss
@use "~@nodestrap/breakpoints/src/index" as breakpoint;
$my-color: rgba(255, 0, 0, 1);
$my-font: 'Arial';


// define awesome-props via mixin
@mixin awesome-props {
    color: red;
    font-family: 'Arial';
    opacity: 0.5;
}

// define awesome-props via placeholder
%awesome-props {
    color: red;
    font-family: 'Arial';
    opacity: 0.5;
}

.a {
    @include awesome-props; // use mixin
}
.b {
    color: blue;
}
.c {
    @extend %awesome-props; // use placeholder
    background: white;
}
.d {
    @include breakpoint.media-up(xl) {
        // @extend %awesome-props; // use placeholder => doesn't work! => error: You may not @extend selectors across media queries.
        @include awesome-props; // use mixin => works!
    }
    background: white;
}
.e {
    // hard coded:
    font-family: $my-font;
    color: $my-color;
    opacity: #{(1 / 2)};

    background: white;
}
.f {
    @include breakpoint.media-up(xl) {
        @include awesome-props; // use mixin => works!
    }
    background: white;
}
```

Then run:
```sh
tilde-sass --file test/*.scss --outFile test/  --outputStyle compressed --mergeSelectors
```

The compiled css would be like this:
(after beautify-ed & added comment for explanation)

```css
.a,
.c,
.e {
    /* awesome-props */
    /* all props defined via mixin or placeholder are here */
    color: red;
    font-family: Arial;
    opacity: .5
}

.b {
    /* private props */
    color: #00f
}

.c,
.d,
.e,
.f {
    /* other shared props */
    background: #fff
}

@media (min-width: 1200px) {
    .d,
    .f {
        /* awesome-props */
        /* on different media query */
        color: red;
        font-family: Arial;
        opacity: .5
    }
}
```


## Installation

run this command to install our compiler:
```sh
npm i tilde-sass --save-dev
```

Then add this scripts into your **package.json**:
```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "compile": "tilde-sass --file src/*.scss --outFile dist/ --mergeSelectors",
    "compile-min": "tilde-sass --file src/*.scss --outFile dist/ --mergeSelectors --outputStyle compressed",
    "compile-watch": "tilde-sass --file src/*.scss --outFile dist/ --mergeSelectors --outputStyle compressed --watch"
}
```


## Usage

To compile your *.sass or *.scss, run this following command:
```sh
npm run compile
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

To disable any compression options set one/more value above to false.
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


## Please Support Us

A lot of coffee has been spent for making this plugins.
Please buy me a cup of coffee to support me continue to develop & improve this application.
Visit: [ko-fi.com](https://ko-fi.com/heymarco)


## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.


## License

[MIT](https://choosealicense.com/licenses/mit/)