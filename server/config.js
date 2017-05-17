const fs = require('fs');
const path = require('path');

const parseConfigFile = function( filename ) {

  const parseConfigFileStr = function( configFileStr ) {
    let config = {};

    const configStrs = configFileStr.split('\n');
    configStrs.forEach( configStr => {
      if ( (configStr[0] !== '#') && (!/^\s*$/.test(configStr)) ) {
        if ( configStr.indexOf('=') === -1 ) {
          throw new Error( 'Malformed config entry: ' + configStr );
        }
        const configKeyValue = configStr.split('=');
        config[configKeyValue[0]] = configKeyValue[1];
      }
    });

    return config;
  };

  let config = {};

  if ( fs.existsSync(filename) ) {
    let configFileStr = fs.readFileSync( filename, 'utf8' );
    config = parseConfigFileStr( configFileStr );
  }

  return config;
};

const configs = parseConfigFile( path.join(__dirname, '../.env') );
const defaultConfigs = parseConfigFile( path.join(__dirname, '../.env.defaults') );

const determineConfig = function( key ) {
  return process.env[key] || configs[key] || defaultConfigs[key];
};

const config = {
  WATSON_TONE_API_KEY: {
    username: determineConfig('WATSON_TONE_USERNAME'),
    password: determineConfig('WATSON_TONE_PASSWORD'),
  },
  WATSON_NLU_API_KEY: {
    username: determineConfig('WATSON_NLU_USERNAME'),
    password: determineConfig('WATSON_NLU_PASSWORD'),
  },
  MM_API_KEY: determineConfig('MM_API_KEY'),
  DATABASE_URL: determineConfig('MONGODB_URI'),
};

module.exports = config;
