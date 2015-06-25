/*jslint node: true */
'use strict';

var express = require('express');
var mongo = require('mongoose');

var router = express.Router();
var bodyParser = require('body-parser');
var Account = require('../../models/Temp.js');

// Connect to mongo db
mongo.connect('http://dev.steszyn.ca/poolmonit');
// mongo.connect('localhost/poolmonit');

var tempAPI = require('./temps');


router.use(bodyParser.urlencoded({ extended: true }));
router.use( bodyParser.json() ); // to support JSON-encoded bodies

router.use('/temps', tempAPI);

router.get('/', function(req, res, next){
    res.send(router.stack);
});

router.all('*', function(req, res, next){
    res.send("404");
});

module.exports = router;
