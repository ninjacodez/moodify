// dependencies
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
// const path = require('path');
const cors = require('cors');
const Promise = require('bluebird');

// other module exports
const auth = require('./auth.js');
const musixMath = require('./service/musixMatch.js');
const spotify = require('./service/spotify.js');
const watson = require('./service/watson.js');
const db = require('../database');

// initialize and set up app
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({secret: "ssshhh", resave: false, saveUninitialized: true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/dist'));

// routes
let sess = {};

app.post('/signup', auth.createUser, (req, res) => {
  sess = req.session;
  sess.username = req.body.username;
  res.send({statusCode: 200});
});

app.post('/login', auth.verifyUser, (req, res) => {
  sess = req.session;
  sess.username = req.body.username;
  res.send({statusCode: 200});
});

app.get('/check', (req, res) => {
  if (req.session.username) {
    res.send({statusCode: 200});
  } else {
    res.send({statusCode: 404});
  }
})

app.get('/logout', (req, res) => {
  req.session.destroy()
  res.send('logged out!')
})

app.post('/search', (req, res) => {
  return musixMath.searchByTitleAndArtist(req.body.title, req.body.artist)
  .then(data => {
    if (data.track_list.length === 0) { res.send({errorMessage: 'No Search Results'}); }
    res.send(data);
  })
  .catch(error => { res.send(error); });
});

app.post('/fetchLyricsByTrackId', (req, res) => {
  const trackId = req.body.trackId;
  return musixMath.getLyricsByTrackId(trackId)
  .then(lyrics => {
    res.send(lyrics);
  })
  .catch(error => { res.send(error); });
});

app.post('/process', (req, res) => {
  let input = req.body;
  const songNameAndArtist = [input.artist_name, input.track_name];
  let watsonData = {};

  return musixMath.getLyricsByTrackId(input.track_id)
  .then(data => {
    const lyrics = data.lyrics.lyrics_body;
    input.lyrics = lyrics.slice(0, (lyrics.indexOf('*******')));
    return;
  })
  .then(() => {
    return watson.queryWatsonToneHelper(input.lyrics)
  })
  .then(data => {
    watsonData = {
      track_id: input.track_id,
      anger: data.anger,
      disgust: data.disgust,
      fear: data.fear,
      joy: data.joy,
      sadness: data.sadness,
      analytical: data.analytical,
      confident: data.confident,
      tentative: data.tentative,
      openness: data.openness,
      conscientiousness: data.conscientiousness,
      extraversion: data.extraversion,
      agreeableness: data.agreeableness,
      emotionalrange: data.emotionalrange
    };
    const newEntry = new db.Watson(watsonData);
    newEntry.save(err => {
      if (err) { console.log('SAVE WATSON ERROR', err ); }
    })
  })
  .then(() => {
    if (req.session.username) {
      return db.User.where({username: req.session.username}).update({ $push: {songs: input.track_id}})
    }
  })
  .then(() => {
    return spotify.getSongByTitleAndArtist(input.track_name, input.artist_name)
  })
  .then( spotifyData => {
    input.spotifyUri = spotifyData;
    const songEntry = new db.Song(input);
    return songEntry.save();
  })
  .then( () => {
    return spotify.getTrackAnalysis( input.spotifyUri.slice('spotify:track:'.length) );
  })
  .then( spotifyAnalysisData => {
    res.json([songNameAndArtist, input.lyrics, watsonData, input.spotifyUri, spotifyAnalysisData]);
  })
  .catch((error) => {
    console.log('/PROCESS ERROR: ', error);
    res.send(error);
  });
})

app.get('/pastSearches', (req, res) => {
  const username = req.session.username;
  return new Promise ((resolve, reject) => {
    db.User.where({ username: username }).findOne((err, user) => {
      if (err) { reject(err); }
      const songs = user.songs;
      resolve(songs);
    })
  })
  .then(songs => {
    if (songs.length === 0) { res.send({errorMessage: 'No Past Searches'}); }
    return new Promise ((resolve, reject) => {
      songArray = []
      songs.forEach((songId, index) => {
        db.Song.where({ track_id: songId }).findOne((err, songData) => {
          if (err) { reject(err); }
          songArray.push({
            track_id: songId,
            track_name: songData.track_name,
            artist_name: songData.artist_name
          });
          if (index === songs.length - 1) { resolve(songArray); }
        });
      });
    })
  })
  .then((songArray) => {
    res.send(songArray);
  })
  .catch(err => {
    res.send({errorMessage: 'No Past Searches'});
  })
});

app.post('/loadPastSearchResults', (req, res) => {
  return new Promise((resolve, reject) => {
    db.Song
    .find({ track_id: req.body.track_id })
    .exec((err, data) => {
      resolve(data[0]);
    })
  })
  .then((songData) => {
    let output = [];
    output.push(songData);
    db.Watson
    .find({ track_id: req.body.track_id })
    .exec((err, watsonData) => {
      output.push(watsonData[0]);
      res.send(output);
    })
  })
  .catch(err => { res.send(err); })
});

module.exports = app;
