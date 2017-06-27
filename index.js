/**
 * Defines module that compiles angualrJS templates written in pug/jade into an 
 * angularJS module
 * @author Daniel W. Chen <daniel.chen@inventivewheel.com>
 */
'use strict';
var fs = require('fs');
var path = require('path');
var nodels = require('node-ls');
var pug = require('pug');

module.exports = {
    /**
     * Ensures directory in the given file path exists
     *
     * @param {string} filePath
     */
    ensureDirectoryExistence: function(filePath) {
        var dirname = path.dirname(filePath);
        if (this.directoryExists(dirname)) {
            return true;
        }
        this.ensureDirectoryExistence(dirname);
        fs.mkdirSync(dirname);
    },
    /**
     * Checks if a directory exists
     *
     * @param {string} path
     */
    directoryExists: function(path) {
        try {
            return fs.statSync(path).isDirectory();
        } catch (err) {
            return false;
        }
    },
    /**
     * Compiles pug/jade files into a angularJS module
     *
     * @param {string} angularJSModuleName
     * @param {object} configs
     * @param {string} srcFolderPath
     * @param {string} distFilePath
     */
    compile: function(angularJSModuleName, configs, srcFolderPath, distFilePath) {
        var templatePaths = [];
        var templateFiles = nodels.listFiles(srcFolderPath, /\.tpl\.(jade|pug)$/i);
        var content = '(function(angular) {';
        var itemPieces;
        var filename;

        content += "'use strict';";
        content += "angular.module('" + angularJSModuleName + "', []).run(function($templateCache) {";
        templateFiles.files.forEach(function(item) {
            itemPieces = item.split('/');
            filename = itemPieces[itemPieces.length -1];
            content += '$templateCache.put("';
            ['.tpl.jade', '.tpl.pug',].some(function(extension) {
                var index = content.indexOf(extension);
                if (index === -1) {
                    return false;
                }
                content += filename.replace(extension, '.html');
                return true;
            });
            content += '","';
            content += pug.render(
                fs.readFileSync(item),
                {
                    filename: filename,
                    configs: configs
                }
            )
                .replace(/\"/g, '\\"')
                .replace(/(\r\n|\n|\r)/gm,"");
            content += '");';
        });
        content += '});';
        content += '})(angular);';
        this.ensureDirectoryExistence(distFilePath);
        fs.writeFileSync(distFilePath, content);
    },
};
