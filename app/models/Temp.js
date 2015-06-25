var mongoose = require('mongoose');

var TempSchema = new mongoose.Schema({
  sol1: { type: String}, 
  sol2: { type: String}, 
  sol3: { type: String}, 
  ambient: { type: String},
  pool: { type: String},
  date: { type: Date, default: Date.now } // Current date
});

module.exports = mongoose.model('temps', TempSchema);
