const Promise = require('bluebird');
const request = Promise.promisifyAll(require('request'));
const watson = Promise.promisifyAll(require('watson-developer-cloud'));
const watsonNLU = Promise.promisifyAll(require('watson-developer-cloud/natural-language-understanding/v1.js'));
const config = require('../config');

const WATSON_TONE_API_KEY = config.WATSON_TONE_API_KEY;
const WATSON_NLU_API_KEY = config.WATSON_NLU_API_KEY;

const tone_analyzer = watson.tone_analyzer({
  url: 'https://gateway.watsonplatform.net/tone-analyzer/api',
  username: WATSON_TONE_API_KEY.username,
  password: WATSON_TONE_API_KEY.password,
  version: 'v3',
  version_date: '2016-05-19'
});

const queryWatsonToneHelper = (songString) => {
  return tone_analyzer.toneAsync({ text: songString })
  .then (data => {

    let emotionalTone = data.document_tone.tone_categories[0];
    let languageTone = data.document_tone.tone_categories[1];
    let socialTone = data.document_tone.tone_categories[2];

    return {
      song: songString,

      // Emotion Tone
      anger: emotionalTone.tones[0].score,
      disgust: emotionalTone.tones[1].score,
      fear: emotionalTone.tones[2].score,
      joy: emotionalTone.tones[3].score,
      sadness: emotionalTone.tones[4].score,

      // Language Tone
      analytical: languageTone.tones[0].score,
      confident: languageTone.tones[1].score,
      tentative: languageTone.tones[2].score,

      // Social Tone
      openness: socialTone.tones[0].score,
      conscientiousness: socialTone.tones[1].score,
      extraversion: socialTone.tones[2].score,
      agreeableness: socialTone.tones[3].score,
      emotionalrange: socialTone.tones[4].score

    };
  })
  .catch(err => {
    console.log("queryWatsonToneHelper error: ", err);
    return err;
  });
};

const nlu = new watsonNLU({
  username: WATSON_NLU_API_KEY.username,
  password: WATSON_NLU_API_KEY.password,
  version_date: '2017-02-27'
});


const queryWatsonNLUHelper = (songString) => {
  const parameters = {
    text: songString,
    features: {
      entities: {
        emotion: true,
        sentiment: true,
        limit: 2
      },
      keywords: {
        emotion: true,
        sentiment: true,
        limit: 2
      }
    }
  }
  return nlu.analyzeAsync(parameters)
  .then (data => {
    return data;
  })
  .catch (err => {
    console.log('queryWatsonNLUHelper error: ', err);
    return err;
  });
};

module.exports.queryWatsonToneHelper = queryWatsonToneHelper;
module.exports.queryWatsonNLUHelper = queryWatsonNLUHelper;
