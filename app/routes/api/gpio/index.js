var express = require('express');
var bodyParser = require('body-parser');
var gpio = require('rpi-gpio');

var router = express.Router();

var relayPump = {pin: 2, value: ''};
var relayS1 = {pin: 3, value: ''};
var relayS2 = {pin: 17, value: ''};
var relayS3 = {pin: 27, value: ''};

var pinList = [relayPump, relayS1, relayS2, relayS3];
var builder = {};
builder.status = failed;

router.get('/', function(req, res){
  for (var i = 0; i < pinList.length; i++){
    gpio.setup(pinList[i].pin, gpio.DIR_IN, readInput);
    gpio.read(pinList[i].pin, function(err, value) {
      console.log('The value is ' + value);
      pinList[i].value = value;
    });

    gpio.destroy();
  }

  builder.status="success";
  builder.gpio = pinList;
  res.json(builder);
});

module.exports = router;