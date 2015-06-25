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

readInput = function(index){
  gpio.read(pinList[index].pin, function(err, value) {
    if (err) throw err;
    console.log('The value is ' + value);
    pinList[index].value = value;
  });
};

write = function(data){
  gpio.write(pinList[i].pin, data.value, function(err) {
    if (err) throw err;
    console.log('Written to pin');
  });
};

router.get('/', function(req, res){
  for (var i = 0; i < pinList.length; i++){
    gpio.setup(pinList[i].pin, gpio.DIR_IN, readInput(i));    
  }

  gpio.destroy();
  builder.status="success";
  builder.gpio = pinList;
  res.json(builder);
});

router.post('/', function(req, res){
  // data === {pin: Number, value: String/Number/Bool}
  var data = req.body.data; //Data to possible say which pin and value to apply to it.

  gpio.setup(data.pin, gpio.DIR_OUT, write(data));

  gpio.destroy();

  builder.status="success";
  builder.message = data.value + ' written to pin!';
  res.json(builder);
});

module.exports = router;