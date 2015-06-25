var http = require('http');

exports.update = function () {
  http.get('http://localhost:'+CONFIG.port+'/api/temps/update', function(res){
    res.on("data", function(chunk) {
      console.log("BODY: " + chunk);
    });
  });
};