
/**
 * Registers task to compile angularJS templates
 */
'use strict';
module.exports = function(grunt) {
    var nodels = require('node-ls');
    var angularTemplateCompiler = require('angular-template-compiler');
    var angularJSModuleName = 'Templates';
    var configs = {};
    var srcFolderPath = 'src/';
    var distFilePath = 'dist/scripts/Templates.js';
    grunt.registerTask(
        'compile-angular-templates', 
        'A task to compile angularJS templates',
        function() {
            angularTemplateCompiler.compile(angularJSModuleName, 
                                            configs, 
                                            srcFolderPath, 
                                            distFilePath);
        }
    );
};
