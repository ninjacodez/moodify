const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
// mongoose.connect('mongodb://localhost/test');
const config = require('../config/index.js');
const DATABASE_URL = config.DATABASE_URL;

mongoose.connect(DATABASE_URL);
const db = mongoose.connection;

db.on('error', () => {
  console.log('mongoose connection fail ._____.');
});

db.once('open', () => {
  console.log('mongoose connection success! b(^.~)z');
});

var SongSchema = mongoose.Schema({
	track_id: {type: Number, unique: true},
	track_name: String,
	artist_name: String,
	album_coverart_100x100: String,
	album_coverart_350x350: String,
	album_coverart_500x500: String,
	album_coverart_800x800: String,
	lyrics: String

});
var Song = mongoose.model('Song', SongSchema);

var watsonSchema = mongoose.Schema({

  track_id: { type: Number, unique: true },

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

var userSchema = mongoose.Schema({
  username: {type: String, unique: true},
  password: String,
  songs: [Number]
});

var User = mongoose.model('User', userSchema);

module.exports.Song = Song;
module.exports.Watson = Watson;
module.exports.User = User;
