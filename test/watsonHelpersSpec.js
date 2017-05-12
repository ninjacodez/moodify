const watsonHelpers = require('../server/watsonHelpers.js');
const expect = require('chai').expect;

const sampleSong = "Once upon a time you dressed so fine Threw the bums a dime in your prime, didn't you? People call say 'beware doll, you're bound to fall' You thought they were all kidding you You used to laugh about Everybody that was hanging out Now you don't talk so loud Now you don't seem so proud About having to be scrounging your next meal How does it feel, how does it feel? To be without a home Like a complete unknown, like a rolling stone Ahh you've gone to the finest schools, alright Miss Lonely But you know you only used to get juiced in it Nobody's ever taught you how to live out on the street And now you're gonna have to get used to it You say you never compromise With the mystery tramp, but now you realize He's not selling any alibis As you stare into the vacuum of his eyes And say do you want to make a deal? How does it feel, how does it feel? To be on your own, with no direction home A complete unknown, like a rolling stone Ah you never turned around to see the frowns On the jugglers and the clowns when they all did tricks for you You never understood that it ain't no good You shouldn't let other people get your kicks for you You used to ride on a chrome horse with your diplomat Who carried on his shoulder a Siamese cat Ain't it hard when you discovered that He really wasn't where it's at After he took from you everything he could steal How does it feel, how does it feel? To have on your own, with no direction home Like a complete unknown, like a rolling stone Ahh princess on a steeple and all the pretty people They're all drinking, thinking that they've got it made Exchanging all precious gifts But you better take your diamond ring, you better pawn it babe You used to be so amused At Napoleon in rags and the language that he used Go to him he calls you, you can't refuse When you ain't got nothing, you got nothing to lose You're invisible now, you've got no secrets to conceal How does it feel, ah how does it feel? To be on your own, with no direction home Like a complete unknown, like a rolling stone";

describe('queryWatsonToneHelper', function() {

  it('function should exist', function() {
    expect(watsonHelpers.queryWatsonToneHelper).to.be.a('function');
  });

  let queryData = {};

  it('should take string input', function() {
    return watsonHelpers.queryWatsonToneHelper(sampleSong)
    .then(data => {
      queryData = data;
    })
    .catch(err => {
      queryData = err;
    })
  });

  it('should return original search string in song property', function() {
    expect(queryData.song).to.eql(sampleSong);
  });

  it(`should return numbers in anger, disgust, fear, joy, sadness, 
      analytical, confident, tentative, openness, conscientiousness, 
      extraversion, agreeableness, emotionalrange property`, function() {
    expect(queryData.anger).to.be.a('number');
    expect(queryData.disgust).to.be.a('number');
    expect(queryData.fear).to.be.a('number');
    expect(queryData.joy).to.be.a('number');
    expect(queryData.sadness).to.be.a('number');
    expect(queryData.analytical).to.be.a('number');
    expect(queryData.confident).to.be.a('number');
    expect(queryData.tentative).to.be.a('number');
    expect(queryData.openness).to.be.a('number');
    expect(queryData.conscientiousness).to.be.a('number');
    expect(queryData.extraversion).to.be.a('number');
    expect(queryData.agreeableness).to.be.a('number');
    expect(queryData.emotionalrange).to.be.a('number');
  });
  
});