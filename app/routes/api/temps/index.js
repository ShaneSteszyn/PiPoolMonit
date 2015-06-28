/*jslint node: true */
'use strict';

var express = require('express');
var mongo = require('mongoose');
var pythonShell = require('python-shell');

var router = express.Router();
var bodyParser = require('body-parser');

var Temp = require('../../../models/Temp');


// Path is relative to Python install for some reason, so we use absolute path
// scriptPath: '/Users/shanesteszyn/Projects/Olivier/Pool/scripts/'
// scriptPath: '/home/pi/PiPoolMonit/scripts'
var pythonShellOptions = {
  scriptPath: '/home/pi/PiPoolMonit/scripts/'
};

/*===============================
=            /temps            =
===============================*/
// Bearer auth is in header already
router.route('/')
  //localhost:8080/api/temps

  .get(function(req, res, next){  // GET LIST OF PICS
    var builder = {};
    builder.status = "failed";

    // MONGODB find all temps, we should limit this later
    Temp.find({})
      .limit(24)
      .lean()
      .sort({date: -1})
      .exec(function(err, result){
        if ( err || !result ) {
          builder.message = err;
          res.json(builder);
        }else{
          builder.status = "success";
          builder.temps = result;
          res.json(builder);
        }
      });
    
  });

router.route('/update')
  //localhost:8080/api/temps/update

  .get(function(req, res, next){  // GET LIST OF PICS
    var builder = {};
    builder.status = "failed";

    var pyShell = new pythonShell('getTemps.py', pythonShellOptions);

    pyShell.on('message', function(message){
      var newTemp = JSON.parse(message);
      

      newTemp.date = Date();
      var temp = new Temp(newTemp);

      // Save this temp to mongo
      temp.save(function (err) {
        if (err){
          builder.message = err;
          res.json(builder);
          throw err;
        }
        builder.temp = temp;
        builder.status = 'success';
        res.json(builder);
      });
    });

    // When the script ends, save the date recieved
    pyShell.end(function(err){
      if (err) {
        builder.message = err;
        console.log(err);
        res.json(builder);
        throw err;
      }
    });
    
  });

module.exports = router;
