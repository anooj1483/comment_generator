const fs = require('fs');
var path = require('path');
var commentFile = '';
var folderPath = '';
var extension = '.js';
var commentFileContent = "";




var generateComments = async function(commentFile, folderPath, extension){
    this.commentFile = commentFile;
    this.folderPath = folderPath;
    this.extension = extension;
    if(extension.indexOf(".") == -1){
        this.extension = "."+extension;
    }
    
    readCommentFile(commentFile,function(content){
        prependData(getFiles(folderPath));
    });


    //console.log("Getting files of ",folderPath)
    //console.log(getFiles(folderPath));
    
}

function readCommentFile(filePath,callback){
    try{
        console.log("Reading CommentFile")
        fs.readFile(filePath,"utf8",function(err,content){
            commentFileContent = content;      
            //console.log("COMM",commentFileContent)
            callback(commentFileContent);
        });
    }catch(err){
        console.log("Comment File does not exist");
        return;
    }
}

function prependData(paths){
    var processed = 0;
    var async = require("async");
    var prependFile = require('prepend-file');
    console.log(processed+" out of "+paths.length+" completed");
    commentFileContent = "\n"+commentFileContent+"\n"
    async.eachSeries(paths,function(eachpath,finish){        
        eachpath = ""+eachpath+"";               
        prependFile(eachpath,commentFileContent,function(err){            
            processed+=1;
            console.log(processed+" out of "+paths.length+" completed");
            finish();
        })


        
    },function(err,done){
        console.log("Finished!")
    })

}

function getFiles (dir, files_){
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } else if(path.extname(name) == extension){            
            files_.push(name);
        }
    }
    return files_;
}

exports.generateComments = generateComments;