/**
 * Defines module that compiles angualrJS templates written in jade into an 
 * angularJS module
 * @author Daniel W. Chen <daniel.chen@inventivewheel.com>
 */
'use strict';
var fs = require('fs');
var nodels = require('node-ls');
var jade = require('jade');

module.exports = {
    /**
     * Compiles jade files into a angularJS module
     *
     * @param {string} angularJSModuleName
     * @param {object} configs
     * @param {string} srcFolderPath
     * @param {string} distFilePath
     */
    compile: function(angularJSModuleName, configs, srcFolderPath, distFilePath) {
        var templatePaths = [];
        var templateFiles = nodels.listFiles(srcFolderPath, /\.tpl\.jade$/i);
        var content = '(function(angular) {';
        var itemPieces;
        var filename;
        content += "'use strict';";
        content += "angular.module('" + angularJSModuleName + "', []).run(function($templateCache) {";
        templateFiles.files.forEach(function(item) {
            itemPieces = item.split('/');
            filename = itemPieces[itemPieces.length -1];
            content += '$templateCache.put("';
            content += filename.replace('.tpl.jade', '.html');
            content += '","';
            content += jade.render(
                grunt.file.read(item), 
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
        fs.writeFileSync(distFilePath, content);
    },
};
