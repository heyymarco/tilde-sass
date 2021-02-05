import path                 from 'path';
import fiber                from 'fibers';
import { watch, src, dest } from 'gulp';
import gutil                from 'gulp-util';
import gif                  from 'gulp-if';
import sass                 from 'gulp-sass';
import sassCompiler         from 'sass';
import postcss              from 'gulp-postcss'
import cssnano              from 'cssnano';
import mergeRulePlus        from 'postcss-merge-rules-plus';



//@ts-ignore
sass.compiler = sassCompiler;

export default function compile(options: any) {
    if (!options.fiber) options.fiber = fiber;

    if (!options.importer) options.importer = (url: string, prev: String) => {
        return (
            (url[0] === '~') ? {
                file: path.join(process.cwd(), "node_modules", url.replace('~', ''))
            } : null
        );
    }



    let postcssPlugins = [
        // re-compress using postcss+cssnano if --outputStyle compressed
        (options.outputStyle === 'compressed') ? cssnano() : null,

        // merges selectors having the same properties
        options.mergeSelectors ? mergeRulePlus() : null,
    ].filter(p => p !== null);


    let processSass = () =>
        src(options.file as string)
        .pipe(
            sass(options)
            .on('error', sass.logError)
        )
        // re-compile using postcss if postcss have any plugins
        .pipe(gif(postcssPlugins.length > 0,
            postcss(postcssPlugins)
        ))
        .on('error', gutil.log)
        .pipe(dest(options.outFile as string))
        ;
    

    // compile the sass now:
    processSass();

    // compile the sass in the future: (if --watch option set)
    if (options.watch) watch(options.file as string, processSass);
}