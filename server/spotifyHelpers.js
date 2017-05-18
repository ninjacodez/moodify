const Promise = require('bluebird');
const config = require('./config');

const axios = require('axios');
const querystring = require('querystring');
const authenticationParsers = require('www-authenticate').parsers;

const SPOTIFY_AUTHENTICATION_URL = 'https://accounts.spotify.com/api/token';
const SPOTIFY_ROOT_URL = 'https://api.spotify.com/v1';
const SPOTIFY_SEARCH_URL = `${SPOTIFY_ROOT_URL}/search`;

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
  let authHeader = err.response.headers['www-authenticate'];
  let parsedHeader = new authenticationParsers.WWW_Authenticate( authHeader );
  if ( parsedHeader &&
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

const getSongByTitleAndArtist = function( title, artist ) {
  return authenticatedRequest( getSongByTitleAndArtistRequest, title, artist );
};

module.exports.requestAccessToken = requestAccessToken;
module.exports.getSongByTitleAndArtist = getSongByTitleAndArtist;
