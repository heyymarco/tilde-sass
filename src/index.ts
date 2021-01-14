import { src, dest } from 'gulp';
import gulpSass from 'gulp-sass';
import compiler from 'sass';
import fiber from 'fibers';
import path from 'path';



//@ts-ignore
gulpSass.compiler = compiler;

export default function compile(options: any) {
    if (!options.fiber) options.fiber = fiber;

    if (!options.importer) options.importer = (url: string, prev: String) => {
        return (
            (url[0] === '~') ? {
                file: path.join(process.cwd(), "node_modules", url.replace('~', ''))
            } : null
        );
    }

    src(options.file as string)
    .pipe(
        gulpSass(options)
        .on('error', gulpSass.logError)
    )
    .pipe(dest(options.outFile as string))
    ;
}