const { src, dest } = require('gulp');
const fiber = require('fibers');
const sass = require('gulp-sass');
const compiler = require('sass');
sass.compiler = compiler;

const commandLineArgs = require('command-line-args');

const options = commandLineArgs([
    { name: 'src', alias: 's',  type: String, multiple: false, defaultOption: true },
    { name: 'dest', alias: 'd', type: String, multiple: false, defaultOption: false }
]);


const path = require('path');

src(options.src)
.pipe(
    sass({
        fiber: fiber,
        importer: (url, prev, done) => {
            console.log(url);
            console.log(prev);
            console.log(process.cwd());
            
            
            return (
                (url[0] === '~') ? {
                    file: path.join(process.cwd(), url.replace('~', ''))
                } : null
            );
        }
    })
    .on('error', sass.logError)
)
.pipe(dest(options.dest))
;
