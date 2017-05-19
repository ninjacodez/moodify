const _ = require('underscore');
const Promise = require('bluebird');
const config = require('../config');

const axios = require('axios');
const querystring = require('querystring');
const authenticationParsers = require('www-authenticate').parsers;

const SPOTIFY_AUTHENTICATION_URL = 'https://accounts.spotify.com/api/token';
const SPOTIFY_ROOT_URL = 'https://api.spotify.com/v1';
const SPOTIFY_SEARCH_URL = `${SPOTIFY_ROOT_URL}/search`;
const SPOTIFY_ANALYSIS_URL = `${SPOTIFY_ROOT_URL}/audio-features`;

const requestAccessToken = () => {
  const qs = querystring.stringify({ 'grant_type': 'client_credentials' });
  const axiosConfig = {
    auth: {
      username: config.SPOTIFY_API_KEY.id,
      password: config.SPOTIFY_API_KEY.secret,
    }
  };

  return axios.post( SPOTIFY_AUTHENTICATION_URL, qs, axiosConfig )
  .then( response => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
  })
  .catch( err => {
    console.log( 'failed token request' );
    console.log( err );
  });
};

const isExpiredTokenError = function( err ) {
  if ( err.response &&
       err.response.headers &&
       err.response.headers['www-authenticate'] &&
       (parsedHeader = new authenticationParsers.WWW_Authenticate(authHeader)) &&
       parsedHeader.parms &&
       (parsedHeader.parms.error_description === 'The access token expired') ) {
    return true;
  } else {
    return false;
  }
};

const authenticatedRequest = function( requestFunction, ...args ) {
  return requestFunction( ...args )
  .catch( err => {

    if ( isExpiredTokenError(err) ) {
      return requestAccessToken()
      .then( () => {
        return requestFunction( ...args );
      });

    } else {
      return Promise.reject(err);
    }
  });
};

// standardize Spotify's music analysis results to a range of [-1, 1]
// for consistency w/Watson API
// can take single value, or array or object of values
const standardizeResult = function( input ) {
  const standardizeValue = function( val ) {
    return (val * 2) - 1;
  };

  if ( _.isArray(input) ) {
    return _(input).map( val => standardizeValue(val) );
  } else if ( _.isObject(input) ) {
    return _(input).mapObject( val => standardizeValue(val) );
  } else {
    return standardizeValue(val);
  }
};

const getSongByTitleAndArtistRequest = function( title, artist ) {
  const axiosConfig = {
    params: {
      q: `track:${title} artist:${artist}`,
      type: 'track',
    },
  };

  return axios.get( SPOTIFY_SEARCH_URL, axiosConfig )
  .then( response => {
    return response.data.tracks.items[0].uri;
  });
};

const getTrackAnalysisRequest = function( trackId ) {
  return axios.get( `${SPOTIFY_ANALYSIS_URL}/${trackId}` )
  .then( res => {
    return standardizeResult({
    // return {
      danceability: res.data.danceability,
      energy: res.data.energy,
      mood: res.data.valence,
    // };
    });
  });
};

const getSongByTitleAndArtist = function( title, artist ) {
  return authenticatedRequest( getSongByTitleAndArtistRequest, title, artist );
};

const getTrackAnalysis = function( trackId ) {
  return authenticatedRequest( getTrackAnalysisRequest, trackId );
};

module.exports.requestAccessToken = requestAccessToken;
module.exports.getSongByTitleAndArtist = getSongByTitleAndArtist;
module.exports.getTrackAnalysis = getTrackAnalysis;
