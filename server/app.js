// dependencies
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const Promise = require('bluebird');

// other module exports
const auth = require('./auth.js');
const mmHelpers = require('./musixMatchHelpers.js');
const watsonHelpers = require('./watsonHelpers.js');
const db = require('../database');

// initialize and set up app
const app = express();

app.use(cors());
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

app.post('/fetchLyricsByTrackId', (req, res) => {
  console.log(req.body)
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
    songEntry.save()
    //watson call 1?
    return watsonHelpers.queryWatsonToneHelper(input.lyrics)
  })
  .then(moods1 => {
     let watsonData = {  
      track_id: input.track_id,
      anger: moods1.anger,
      disgust: moods1.disgust,
      fear: moods1.fear,
      joy: moods1.joy,
      sadness: moods1.sadness,
      analytical: moods1.analytical,
      confident: moods1.confident,
      tentative: moods1.tentative,
      openness: moods1.openness,
      conscientiousness: moods1.conscientiousness,
      extraversion: moods1.extraversion,
      agreeableness: moods1.agreeableness,
      emotionalrange: moods1.emotionalrange
    };
    const newEntry = new db.Watson(watsonData);
    newEntry.save()
    res.json([input.lyrics, watsonData]);
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
  .catch(() => {
    console.log('hello from catch')
    res.send('error');
  });
})

module.exports = app;
