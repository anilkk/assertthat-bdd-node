'use strict'

var assertThat = require('./lib/assertthat-bdd');
var _ = require('underscore');
var _dateFormat = require('dateFormat');
var now = new Date();

var defaults = {
    accessKey: process.env.ASSERTTHAT_ACCESS_KEY,
    secretKey: process.env.ASSERTTHAT_SECRET_KEY,
    jsonReportFolder: './reports/',
    mode: 'automated',
    runName: 'Test run ' + _dateFormat(now, "dd mmm yyyy HH:mm:ss"),
    outputFolder: './features/',
    proxyURI:  process.env.http_proxy,

};

function checkArgs(settings){
     _.defaults(settings, defaults);
    if(!settings.projectId){
        throw new Error('projectId setting is required');
    }
    if(!settings.accessKey){
        throw new Error('accessKey setting is required');
    }
    if(!settings.secretKey){
        throw new Error('secretKey setting is required');
    }
    console.log(settings);
    return settings;
}

module.exports = {
    downloadFeatures:  function(settings, callback) {
        settings = checkArgs(settings);
        assertThat.downloadFeatures(settings, function() {
            if (callback) callback();
        });
    },
    uploadReports: function(settings, callback) {
        console.log(settings);
        settings = checkArgs(settings);
        assertThat.uploadReports(settings, function() {
            if (callback) callback();
        });
    }
}
