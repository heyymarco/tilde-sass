"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gulp_1 = require("gulp");
const gulp_if_1 = __importDefault(require("gulp-if"));
const gulp_util_1 = __importDefault(require("gulp-util"));
const gulp_sass_1 = __importDefault(require("gulp-sass"));
const gulp_postcss_1 = __importDefault(require("gulp-postcss"));
// @ts-ignore
const postcss_merge_selectors_1 = __importDefault(require("postcss-merge-selectors"));
const cssnano_1 = __importDefault(require("cssnano"));
const sass_1 = __importDefault(require("sass"));
const fibers_1 = __importDefault(require("fibers"));
const path_1 = __importDefault(require("path"));
//@ts-ignore
gulp_sass_1.default.compiler = sass_1.default;
function compile(options) {
    if (!options.fiber)
        options.fiber = fibers_1.default;
    if (!options.importer)
        options.importer = (url, prev) => {
            return ((url[0] === '~') ? {
                file: path_1.default.join(process.cwd(), "node_modules", url.replace('~', ''))
            } : null);
        };
    let postcssPlugins = [
        // re-compress using postcss+cssnano if --outputStyle compressed
        (options.outputStyle === 'compressed') ? cssnano_1.default() : null,
        // merges selectors having the same properties
        options.mergeSelectors ? postcss_merge_selectors_1.default() : null,
    ].filter(p => p !== null);
    let processSass = () => gulp_1.src(options.file)
        .pipe(gulp_sass_1.default(options)
        .on('error', gulp_sass_1.default.logError))
        // re-compile using postcss if postcss have any plugins
        .pipe(gulp_if_1.default(postcssPlugins.length > 0, gulp_postcss_1.default(postcssPlugins)))
        .on('error', gulp_util_1.default.log)
        .pipe(gulp_1.dest(options.outFile));
    // compile the sass now:
    processSass();
    // compile the sass in the future: (if --watch option set)
    if (options.watch)
        gulp_1.watch(options.file, processSass);
}
exports.default = compile;
