// dependencies
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Promise = require('bluebird');

// other module exports
const auth = require('./auth.js');
const mmHelpers = require('./musixMatchHelpers.js');
const db = require('../database');

// initialize and set up app
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../react-client/dist'));

// routes
// user identity has to be verified before he/she reaches the homepage (?)
app.get('/', auth.verifySession, (req, res) => {
});

app.get('/fetchSong', (req, res) => {
  // let title = req.body.title ???
  // let artist = req.body.artist ???
  let title = 'happy';
  let artist = 'Pharrell Williams';
  db.Song
  .find({title: title, artist: artist})
  .select('title artist lyrics')
  .exec(songObj => {
    res.send(songObj);
  });
});

app.post('/saveLyricsByTrackId', (req, res) => {
  let trackId = req.body.trackId;
  return mmHelpers.getLyricsByTrackId(trackId)
  .then(lyrics => { res.send(lyrics); })
  .catch(error => { res.send(error); });
});

app.post('/saveLyricsByTitleAndArtist', (req, res) => {
  // let title = req.body.title ???
  // let artist = req.body.artist ???
  let title = 'happy';
  let artist = 'Pharrell Williams';
  return mmHelpers.getLyricsByTitleAndArtist(title, artist)
  .tap(lyrics => {
    let options = {
      title: title,
      artist: artist,
      lyrics: lyrics
    };
    let newSong = new db.Song({options});
    newSong.save();
  })
  .then(lyrics => { res.send(lyrics); })
  .catch(error => { res.send(error); });
});

module.exports = app;
