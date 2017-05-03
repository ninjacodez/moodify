const qp = require('query-parse');
const request = require('request-promise');

const MM_API_KEY = 'f7e6858d59f3073eda9f69ddb6f8dec4';
const rootUrl = 'http://api.musixmatch.com/ws/1.1/';

const finalQueryString = (method, params) => {
  return rootUrl + method + qp.toString(params);
};

const getLyricsByTrackId = (trackId) => {
  const method = 'track.lyrics.get?';
  let params = {
    apikey: MM_API_KEY,
    format: 'json',
    callback: 'callback',
    track_id: trackId
  };
  request(finalQueryString(method, params), (data) => {
    return data.body.lyrics.lyrics_body;
  });
};

const findSong = (trackName, artistName) => {
  const method = 'matcher.track.get?';
  let params = {
    apikey: MM_API_KEY,
    format: 'json',
    callback: 'callback',
    q_track: trackName,
    q_artist: artistName
  };

  return request(finalQueryString(method, params), (data) => {
    return data;
  });
};

module.exports.getLyricsByTrackId = getLyricsByTrackId;
module.exports.findSong = findSong;
