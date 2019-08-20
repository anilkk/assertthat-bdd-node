'use strict'

var assertThat = require('./lib/assertthat-bdd');
var _ = require('underscore');
var now = new Date();
var datestring = now.getDate()  + "-" + (now.getMonth()+1) + "-" + now.getFullYear() + " " +
    now.getHours() + ":" + now.getMinutes();

var defaults = {
    accessKey: process.env.ASSERTTHAT_ACCESS_KEY,
    secretKey: process.env.ASSERTTHAT_SECRET_KEY,
    jsonReportFolder: './reports/',
    mode: 'automated',
    runName: 'Test run ' + datestring,
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
