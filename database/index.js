var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test')

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection fail ._____.');
});

db.once('open', function() {
  console.log('mongoose connection success! b(^.~)z');
});

var SongSchema = mongoose.Schema({
	musicMatchID: {type: String, unique: true},
	albumCoverArt100: String,
	albumCoverArt350: String,
	albumCoverArt500: String,
	albumCoverArt800: String,
	artistName: String,
	name: String,
	Lyrics: String,
	Mood: String 
});

var Song = mongoose.model('Song', SongSchema);
// var Test = mongoose.model('Test', TestSchema);

// var SongSchema = mongoose.Schema({
//   title: String,
//   artist: String,
//   lyrics: String
// });

// module.exports.Test = Test;
module.exports.Song = Song;
