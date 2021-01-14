# tilde-sass

**tilde-sass** is a SASS compiler with tilde (~) support for resolving **node_modules** path and supports new sass' syntax.

## Installation

```sh
npm i tilde-sass
```

## Usage

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "compile": "tilde-sass --file src/*.scss --outFile dist/ --outputStyle compressed"
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

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)