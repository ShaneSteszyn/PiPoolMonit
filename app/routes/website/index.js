var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var router = express.Router();

router.all('/', function(req, res){
    res.render('index', {
    });
});

router.all('*', function(req, res){
    res.send("404");
});

module.exports = router;