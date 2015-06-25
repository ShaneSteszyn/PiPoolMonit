var fs = require('fs');
var config = require('./config.default');

  if (!fs.existsSync(__dirname + '/config')) {
    fs.mkdirSync(__dirname + '/config');
  }

fs.writeFileSync(__dirname + '/config/main.js', 'module.exports = ' + JSON.stringify(config, null, 4));

console.log('Config written!');
console.log('Run with: node server.js or node server.js --development (for port 8080)');