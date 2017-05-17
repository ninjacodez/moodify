// dependencies
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const axios = require('axios');

const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const SpotifyWebApi = require('spotify-web-api-node');


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
    /* CREATE A USER HERE SO THERE IS NO NEED TO EVER "SIGN UP" */
    
    // let url = `https://api.spotify.com/v1/users/${profile.id}/playlists`;
    // axios.get(url, { 'headers': { 'Authorization': `Bearer ${accessToken}` } })
    //   .then((res) => {
    //     console.log('received playlists from spotify: ', res.data.items);
    //   })
    //   .catch((err) => {
    //     console.log('error retrieving playlists from spotify ', err);
    //   })
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
    res.redirect('/');
  });






var spotifyApi = new SpotifyWebApi({clientId: config.SPOTIFY_CLIENT_API_KEY, clientSecret: config.SPOTIFY_CLIENT_SECRET_API_KEY});
spotifyApi.clientCredentialsGrant()
 .then(function(data) {
   console.log('The access token expires in ' + data.body['expires_in']);

   // Save the access token so that it’s used in future calls
   spotifyApi.setAccessToken(data.body['access_token']);
 }, function(err) {
   console.log('Something went wrong when retrieving an access token', err.message);
 });


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

//modified check
app.get('/check', (req, res) => {
  if (req.session.username || req.session.passport) {
    console.log('cool!!!!')
    res.send({statusCode: 200});
  } else {
    res.send({statusCode: 404});
  }
})


app.get('/logout', (req, res) => {
  req.session.destroy()
  res.send('logged out!')
})

 app.get('/newreleases', (req,res) => {
   // spotifyApi.getNewReleases({ limit : 10, offset: 0, country: 'US' })
   //   .then(data => {
   //      topTenData = {
   //        songs: data.body.albums.items,
   //        dateadded: Date.now()
   //      };
   //    const newTopTenEntry = new db.TopTenSongs(topTenData);
   //    newTopTenEntry.save(err => {
   //      if (err) {console.log('Error saving TopTenSong data')}
   //        })
   //     res.send(data.body.albums.items);
   //   });

   //   }, function(err) {
   //     console.log("could not get new releases", err);
   });




app.post('/search', (req, res) => {
  return mmHelpers.searchByTitleAndArtist(req.body.title, req.body.artist)
  .then(data => {
    if (data.track_list.length === 0) { res.send({errorMessage: 'No Search Results'}); }
    res.send(data);
  })
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
  const username = req.session.username || req.session.passport.username;
  return new Promise ((resolve, reject) => {
    db.User.where({ username: username }).findOne((err, user) => {
      if (err) { reject(err); }
      const songs = user !== null ? user.songs : [];
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
