var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test')

var db = mongoose.connection;

db.on('error', function() {
  console.log('fail ._____.');
});

db.once('open', function() {
  console.log('success! b(^.~)z');
});

var TestSchema = mongoose.Schema({
	name: String
});

var Test = mongoose.model('Test', TestSchema);

module.exports = Test; 