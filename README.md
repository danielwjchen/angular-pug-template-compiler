# angularJS template compiler

A commonJS module provides function to compile angular templates written in jade-lang into a JS file. It utilizes [$templateCache](https://docs.angularjs.org/api/ng/service/$templateCache). The jade files must end with `.tpl.jade` as file extension. 

Please note this compiler runs synchronously. 

## Dependencies
This module depends on [node-ls](https://github.com/StickOutSocial/node-ls). Please run `npm install`.
## Installation
It is possible to use `npm` to install this repo. Simply adds the URL to the `package.json` and run `npm install`.
## Usage Example
```javascript
var compiler = require('node-angular-template-compiler');
var angularJSModuleName = 'Template'; // defines angularJS module name
var configs = {}; // defines jade options
var srcFolderPath =  '/path/to/template/folder/'; // defines path to folder contains jade files. Files must end with .tpl.jade
var distFilePath = '/path/to/dist/Template.js'; // defines path of the created angular module

// creates an angularJS module named Template stored as /path/to/dist/Template.js
compiler.compiler(angularJSModuleName,
                  configs,
                  srcFolderPath,
                  distFilePath);
```
