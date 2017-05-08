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
	lyrics: String,
	mood: String
});

var Song = mongoose.model('Song', SongSchema);
// var Test = mongoose.model('Test', TestSchema);

// var SongSchema = mongoose.Schema({
//   title: String,
//   artist: String,
//   lyrics: String
// });

var watsonSchema = mongoose.Schema({

  song: String,

	// Emotion Tone
  anger: Number,
  disgust: Number,
  fear: Number,
  joy: Number,
  sadness: Number,

  // Language Tone
  analytical: Number,
  confident: Number,
  tentative: Number,

  // Social Tone
  openness: Number,
  conscientiousness: Number,
  extraversion: Number,
  agreeableness: Number,
  emotionalrange: Number
  
});

var Watson = mongoose.model('Watson', watsonSchema);

module.exports.Song = Song;
module.exports.Watson = Watson;
// module.exports.Test = Test;
