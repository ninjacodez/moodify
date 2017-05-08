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
app.get('/', auth.verifySession, (req, res) => {});

app.post('/search', (req, res) => {
  return mmHelpers.searchByTitleAndArtist(req.body.title, req.body.artist)
  .then(data => { res.send(data); })
  .catch(error => { res.send(error); });
});

// app.get('/fetchSong', (req, res) => {
//   // let title = req.body.title ???
//   // let artist = req.body.artist ???
//   let title = 'happy';
//   let artist = 'Pharrell Williams';
//   db.Song
//   .find({title: title, artist: artist})
//   .select('title artist lyrics')
//   .exec(songObj => {
//     res.send(songObj);
//   });
// });

app.post('/fetchLyricsByTrackId', (req, res) => {
  let trackId = req.body.trackId;
  return mmHelpers.getLyricsByTrackId(trackId)
  .then(lyrics => {
    res.send(lyrics);
  })
  .catch(error => { res.send(error); });
});

app.post('/process', (req, res) => {
  let input = req.body;
  return mmHelpers.getLyricsByTrackId(input.track_id)
  .then(data => {
    input.lyrics = data.lyrics.lyrics_body;
    var songEntry = new db.Song(input);

    songEntry.save((err, songEntry) => {
      if (err) { throw error; }
      console.log('saved: ', songEntry.track_name);
      res.send(input.lyrics);
    });
  })
})


// app.post('/saveLyricsByTitleAndArtist', (req, res) => {
//   // let title = req.body.title ???
//   // let artist = req.body.artist ???
//   // let title = 'happy';
//   // let artist = 'Pharrell Williams';
//   return mmHelpers.getTrackInfo(trackId)
//   .then(obj => {
//     let options = {
//       name: obj.body.track.track_name,
//       artist: obj.body.track.artist_name,
//       albumCoverArt100: obj.body.track.album_coverart_100x100,
//       albumCoverArt350: obj.body.track.album_coverart_350x350,
//       albumCoverArt500: obj.body.track.album_coverart_500x500,
//       albumCoverArt800: obj.body.track.album_coverart_800x800,
//       // Mood:
//     };
//   })
//   return mmHelpers.getLyricsByTitleAndArtist(title, artist)
//   .then(lyrics => {
//     let newSong = new db.Song({options});
//     newSong.save();
//     res.send(lyrics)
//   })
//   // .then(lyrics => { res.send(lyrics); })
//   let title = 'happy';
//   let artist = 'Pharrell Williams';
//   return mmHelpers.getLyricsByTitleAndArtist(title, artist)
//   .tap(lyrics => {
//     let options = {
//       title: title,
//       artist: artist,
//       lyrics: lyrics
//     };
//     let newSong = new db.Song({options});
//     newSong.save();
//   })
//   .then(lyrics => { res.send(lyrics); })
//   .catch(error => { res.send(error); });
// });

module.exports = app;
