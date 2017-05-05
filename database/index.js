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
	track_id: {type: String, unique: true},
	track_name: String,
	artist_name: String,
	album_coverart_100x100: String,
	album_coverart_350x350: String,
	album_coverart_500x500: String,
	album_coverart_800x800: String,
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

module.exports.Song = Song;
// module.exports.Test = Test;
