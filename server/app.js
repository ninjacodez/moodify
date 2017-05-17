// dependencies
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');

const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;

const cors = require('cors');
const Promise = require('bluebird');

// other module exports
const auth = require('./auth.js');
const mmHelpers = require('./musixMatchHelpers.js');
const spotifyHelpers = require('./spotifyHelpers.js');
const watsonHelpers = require('./watsonHelpers.js');
const db = require('../database');
const config = require('../config/index.js');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

const app = express();

passport.use(new SpotifyStrategy({
  clientID: config.SPOTIFY.clientId,
  clientSecret: config.SPOTIFY.secret,
  callbackURL: config.SPOTIFY.cbURL
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('accessToken: ', accessToken);
    console.log('refreshToken: ', refreshToken);
    console.log('profile: ', profile);
    done(null, profile);
  }
  ));
//////////////////////////////////////////////////////////////////
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({secret: "ssshhh", resave: false, saveUninitialized: true}));
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(__dirname + '/../react-client/dist'));

// routes
let sess = {};


app.get('/auth/spotify',
  passport.authenticate('spotify', {scope: ['user-read-email'], showDialog: true}),
  (req, res) => {
    console.log('You fucked up, this should not be called');
  });

app.get('/auth/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  (req, res) => {
    console.log('SUCCESSFUL AUTHENTICATION. ONE DAY');
    res.redirect('/');
  });








app.post('/signup', auth.createUser, (req, res) => {
  console.log('signing up');
  sess = req.session;
  sess.username = req.body.username;
  res.send({statusCode: 200});
});

app.post('/login', auth.verifyUser, (req, res) => {
  console.log('logging in');
  sess = req.session;
  sess.username = req.body.username;
  res.send({statusCode: 200});
});

app.get('/check', (req, res) => {
  console.log('checking something');
  if (req.session.username) {
    console.log('cool')
    res.send({statusCode: 200});
  } else {
    console.log('I mdskjhfkjhdfkjshd')
    res.send({statusCode: 404});
  }
})


app.get('/logout', (req, res) => {
  console.log('logging out');
  console.log('logging out');
  req.session.destroy()
  res.send('logged out!')
})

// app.get('/newreleases', (req,res) => {
//   spotifyApi.getNewReleases({ limit : 20, offset: 0, country: 'US' })
//     .then(function(data) {
//       res.send(data.body.albums.items);
//     }, function(err) {
//       console.log("could not get new releases", err);
//   });
// });

app.post('/search', (req, res) => {
  console.log('searching');
  return mmHelpers.searchByTitleAndArtist(req.body.title, req.body.artist)
  .then(data => {
    if (data.track_list.length === 0) { res.send({errorMessage: 'No Search Results'}); }
    res.send(data);
  })
  .catch(error => { res.send(error); });
});

app.post('/fetchLyricsByTrackId', (req, res) => {
  console.log('getting lyrics by track id');
  const trackId = req.body.trackId;
  return mmHelpers.getLyricsByTrackId(trackId)
  .then(lyrics => {
    res.send(lyrics);
  })
  .catch(error => { res.send(error); });
});

app.post('/process', (req, res) => {
  console.log('process');
  let input = req.body;
  const songNameAndArtist = [input.artist_name, input.track_name];
  let watsonData = {};

  return mmHelpers.getLyricsByTrackId(input.track_id)
  .then(data => {
    const lyrics = data.lyrics.lyrics_body;

    input.lyrics = lyrics.slice(0, (lyrics.indexOf('*******')));
    return;
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
    newEntry.save(err => {
      if (err) { console.log('SAVE WATSON ERROR'); }
    })
  })
  .then(() => {
    if (req.session.username) {
      return db.User.where({username: req.session.username}).update({ $push: {songs: input.track_id}})
    }
  })
  .then(() => {
    return spotifyHelpers.getSongByTitleAndArtist(input.track_name, input.artist_name)
  })
  .then((spotifyData) => {
    input.spotify_uri = spotifyData

    const songEntry = new db.Song(input);
    songEntry.save(err => {
      if (err) { console.log("SAVE SONG ERROR"); }
    })
  })
  .then(() => {
    res.json([songNameAndArtist, input.lyrics, watsonData, input.spotify_uri]);
  })
  .catch((error) => {
    console.log('/PROCESS ERROR: ', error);
    res.send(error);
  });
})

app.get('/pastSearches', (req, res) => {
  console.log('pastSearches');
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
  console.log('load pas things');
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
