const Promise = require('bluebird');

const app = require('./app.js');
const config = require('./config');
const spotify = require('./service/spotify');

app.listen = Promise.promisify( app.listen );

spotify.requestAccessToken( true )
.then( () => {
  return app.listen( config.HTTP_LISTEN_PORT );
})
.then( () => {
  console.log( `Moodify server is listening on port ${config.HTTP_LISTEN_PORT}.` );
})
.catch( err => {
  console.log( err );
});
