#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_line_args_1 = __importDefault(require("command-line-args"));
const index_1 = __importDefault(require("./index"));
const options = (0, command_line_args_1.default)([
    { name: 'file', alias: 'f', type: String, multiple: false, defaultOption: true },
    { name: 'outFile', alias: 'o', type: String },
    { name: 'watch', type: Boolean },
    { name: 'mergeSelectors', type: Boolean },
    { name: 'sourceMap', alias: 'm', type: String },
    { name: 'includePaths', alias: 'i', type: String },
    { name: 'outputStyle', alias: 's', type: String },
    { name: 'precision', alias: 'p', type: Number },
    { name: 'indentType', alias: 'n', type: String },
    { name: 'indentWidth', alias: 'w', type: Number },
    { name: 'linefeed', alias: 'l', type: String },
    { name: 'sourceComments', alias: 'c', type: Boolean },
]);
(0, index_1.default)(options);
