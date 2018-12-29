#!/usr/bin/env node
var comgen = require('../lib/comgen');
var args = process.argv.splice(process.execArgv.length + 2);

var commentPath = args[0];
var folderPath = args[1];
var extension = args[2];

if(commentPath == undefined){
    console.log("Missing comment content file")
    return;
}

if(folderPath == undefined){
    console.log("Missing source folder path")
    return;
}

if(extension == undefined){
    console.log("Missing extension of files")
    return;
}

comgen.generateComments(commentPath, folderPath, extension);