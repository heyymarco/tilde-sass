#!/usr/bin/env node
import commandLineArgs from 'command-line-args';
import compiler from './index';



const options = commandLineArgs([
    { name: 'file',             alias: 'f', type: String, multiple: false, defaultOption: true },
    { name: 'outFile',          alias: 'o', type: String },
    { name: 'watch',                        type: Boolean },

    { name: 'mergeSelectors',               type: Boolean },

    { name: 'sourceMap',        alias: 'm', type: String },
    { name: 'includePaths',     alias: 'i', type: String },

    { name: 'outputStyle',      alias: 's', type: String },
    { name: 'precision',        alias: 'p', type: Number },
    { name: 'indentType',       alias: 'n', type: String },
    { name: 'indentWidth',      alias: 'w', type: Number },
    { name: 'linefeed',         alias: 'l', type: String },
    { name: 'sourceComments',   alias: 'c', type: Boolean },
]);


compiler(options);