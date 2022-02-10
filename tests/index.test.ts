import { src, dest }   from 'gulp';
import gulpSass        from 'gulp-sass';
import sassCompiler    from 'sass';
import commandLineArgs from 'command-line-args';
import path from 'path';



const sassProcessor = gulpSass(sassCompiler);



const options = commandLineArgs([
    { name: 'src', alias: 's',  type: String, multiple: false, defaultOption: true },
    { name: 'dest', alias: 'd', type: String, multiple: false, defaultOption: false }
]);


src(options.src)
.pipe(
    sassProcessor({
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
    .on('error', sassProcessor.logError)
)
.pipe(dest(options.dest))
;
