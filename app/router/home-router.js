'use strict';

var Controller = require('../controller/home-controller');
var activityController = require('../controller/activity-controller');

module.exports = function(app){
    //首页
    app.get('/', activityController.getActivityList, Controller.index);
};