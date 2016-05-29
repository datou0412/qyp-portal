'use strict';

var _ = require('lodash');
var formidable = require('formidable');
var fs = require('fs');
var uuid = require('node-uuid');
var public_path='./'
var host_name='http://www.dream623.com/u_img/'


exports.upload = function* (next) {
    var ctx = this;
        console.log('upload module');
        var form = new formidable.IncomingForm();
        var img_path = uuid.v1()+".jpg";
        var fs_path=public_path+ img_path;
        form.parse(request, function (error, fields, files) {
            fs.renameSync(files.upload.path, fs_path);
        });
    ctx.locals.error = '0';
    ctx.locals.img_url = host_name+img_path;
    yield this.render('uploader/upload', {});
};

