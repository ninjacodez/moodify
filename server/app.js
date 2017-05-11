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
const mmHelpers = require('./musixMatchHelpers.js');
const spotifyHelpers = require('./spotifyHelpers.js');
const watsonHelpers = require('./watsonHelpers.js');
const db = require('../database');

// initialize and set up app
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({secret: "ssshhh", resave: false, saveUninitialized: true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../react-client/dist'));

// routes
var sess;

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

app.get('/logout', (req, res) => {
  req.session.destroy()
  res.send('logged out!')
})

app.post('/search', (req, res) => {
  return mmHelpers.searchByTitleAndArtist(req.body.title, req.body.artist)
  .then(data => { res.send(data); })
  .catch(error => { res.send(error); });
});

app.post('/fetchLyricsByTrackId', (req, res) => {
  const trackId = req.body.trackId;
  return mmHelpers.getLyricsByTrackId(trackId)
  .then(lyrics => {
    res.send(lyrics);
  })
  .catch(error => { res.send(error); });
});

app.post('/process', (req, res) => {
  if (req.session.username) {
    console.log('in session!')
  } else {
    console.log('not in session!')
  }
  let input = req.body;
  const songNameAndArtist = [input.artist_name, input.track_name];
  let watsonData = {};

  return mmHelpers.getLyricsByTrackId(input.track_id)
  .then(data => {
    const lyrics = data.lyrics.lyrics_body;

    input.lyrics = lyrics.slice(0, (lyrics.indexOf('*******')));

    const songEntry = new db.Song(input);
    return songEntry.save(err => {
      if (err) console.log ("SAVE SONG ERROR", err);
    })
  })
  .then(() => {
    return watsonHelpers.queryWatsonToneHelper(input.lyrics)
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
    return newEntry.save(err => {
      if (err) console.log('SAVE WATSON ERROR: ', err);
    })
  })
  .then(() => {
    if (req.session.username) {
      db.User.where({username: req.session.username}).update({ $push: {songs: input.track_id}})
    }
    return spotifyHelpers.getSongByTitleAndArtist(input.track_name, input.artist_name)
  })
  .then(spotifyData => {
    res.json([songNameAndArtist, input.lyrics, watsonData, spotifyData]);
  })
  // .then(data => {
  //   //watson call 2?
  //   watsonHelpers.queryWatsonNLUHelper(input.lyrics)
  // })
  // .then(() => {
  //   //write everything to db
  //   var songEntry = new db.Song(input);
  //   return songEntry.save()
  // })
  .catch((error) => {
    console.log('/PROCESS ERROR: ', error);
    res.send(error);
  });
})

module.exports = app;
