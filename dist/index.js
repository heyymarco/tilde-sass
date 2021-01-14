"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gulp_1 = require("gulp");
const gulp_sass_1 = __importDefault(require("gulp-sass"));
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
    gulp_1.src(options.file)
        .pipe(gulp_sass_1.default(options)
        .on('error', gulp_sass_1.default.logError))
        .pipe(gulp_1.dest(options.outFile));
}
exports.default = compile;
