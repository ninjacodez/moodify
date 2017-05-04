var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test')

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection fail ._____.');
});

db.once('open', function() {
  console.log('mongoose connection success! b(^.~)z');
});

var TestSchema = mongoose.Schema({
	name: String
});

var Test = mongoose.model('Test', TestSchema);

// var SongSchema = mongoose.Schema({
//   title: String,
//   artist: String,
//   lyrics: String
// });
// var Song = mongoose.model('Song', SongSchema);


module.exports.Test = Test;
// module.exports.Song = Song;
