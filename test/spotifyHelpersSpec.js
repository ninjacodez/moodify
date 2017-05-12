const spotifyHelpers = require('../server/spotifyHelpers.js');
const expect = require('chai').expect;

describe('getSongByTitleAndArtist', function() {
  it('function should exist', function() {
    expect(spotifyHelpers.getSongByTitleAndArtist).to.be.a('function');
  });

  const testTitle = 'like a rolling stone';
  const testArtist = 'the rolling stones';
  let queryData = {};

  it('should take 2 string inputs, title and artist', function() {
    return spotifyHelpers.getSongByTitleAndArtist(testTitle, testArtist)
    .then(data => {
      queryData = data;
      return data;
    })
    .catch(err => {
      queryData = err;
      return err;
    });
  });

  it('should return spotify uri string', function() {
    expect(queryData).is.a('string');
    expect(queryData).to.equal('spotify:track:0oXnmfo2kW3joSeiXoazdV');
  });

});