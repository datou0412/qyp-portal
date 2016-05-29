'use strict';

var Controller = require('../controller/uploader-controller');

var prefix = '/uploader';

module.exports = function(app){
    app.post(prefix + '/upload', Controller.upload);
};