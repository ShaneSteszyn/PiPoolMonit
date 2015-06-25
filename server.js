/*jslint node: true */
'use strict';

var express = require('express');
var app = express();
var http = require('http');
var server = http.Server(app);
var bodyParser = require('body-parser');

// Routes
var api = require('./app/routes/api');
var website = require('./app/routes/website');
var scripts = require('./app/scripts');

/*==========  Server Setup  ==========*/

app.use(bodyParser.urlencoded({ extended: true }));
app.use( bodyParser.json() ); // to support JSON-encoded bodies

process.argv.forEach(function(v){
  if(v === '--development') {
    global.PRODUCTION = false;
    global.CONFIG = require('./config/main.js').development;
  } else {
    global.PRODUCTION = true;
    global.CONFIG = require('./config/main.js').production;
  }
});


// Log all reqs to console (terminal)
app.use(function(req, res, next) {
  console.log(Date(), req.method, req.url);
  next();
});


app.set('jsonp callback name', 'callback');
app.set('json replacer', "  ");

app.use('/vendor', express.static('bower_components'));
app.use(express.static('app/public'));

app.use('/api', api);
app.use('/', website);

/*==========  Begin Server Listen  ==========*/

server.listen(CONFIG.port, function(){
  console.log('listening on *:'+ CONFIG.port);
});

/*==========  Run the update script once, then every hour   ==========*/
setTimeout(scripts.update(), 1000 * 60 * 60);