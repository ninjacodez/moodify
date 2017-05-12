const musixMatchHelpers = require('../server/musixMatchHelpers.js');
const expect = require('chai').expect;

describe('getLyricsByTrackId', function() {

  it('function should exist', function() {
    expect(musixMatchHelpers.getLyricsByTrackId).to.be.a('function');
  });

  const testTrackId = '15445219';
  let queryData = {};

  it('should take string', function() {
    return musixMatchHelpers.getLyricsByTrackId(testTrackId)
    .then(data => {
      queryData = data;
    });
  });

  it('should return obj with correct lyrics_id property', function() {
    expect(queryData.lyrics.lyrics_id).to.equal(16258913);
  });

  it('should return obj with string in lyrics_body property', function() {
    expect(queryData.lyrics.lyrics_body).to.be.a('string');
  });

});

describe('getLyricsByTitleAndArtist', function() {

  it('function should exist', function() {
    expect(musixMatchHelpers.getLyricsByTitleAndArtist).to.be.a('function');
  });

  const testTitle = 'like a rolling stone';
  const testArtist = 'the rolling stones';
  let queryData = {};

  it('should take 2 string inputs, title and artist', function() {
    return musixMatchHelpers.getLyricsByTitleAndArtist(testTitle, testArtist)
    .then(data => {
      queryData = data;
    });
  });

  it('should return obj with correct lyrics_id property', function() {
    expect(queryData.lyrics.lyrics_id).to.equal(13721257);
  });

  it('should return obj with string in lyrics_body property', function() {
    expect(queryData.lyrics.lyrics_body).to.be.a('string');
  });

});

describe('searchByTitleAndArtist', function() {

  it('function should exist', function() {
    expect(musixMatchHelpers.searchByTitleAndArtist).to.be.a('function');
  });
  
  const testTitle = 'i cant get no satisfaction';
  const testArtist = 'the rolling stones';

  it('should take only title and return array in track_list property', function() {
    return musixMatchHelpers.searchByTitleAndArtist(testTitle, '')
    .then(data => {
      expect(data.track_list).to.be.a('array');
    });
  });

  it('should take only artist and return array in track_list property', function() {
    return musixMatchHelpers.searchByTitleAndArtist('', testArtist)
    .then(data => {
      expect(data.track_list).to.be.a('array');
    });
  });

  it('should take both title and return array in track_list property', function() {
    return musixMatchHelpers.searchByTitleAndArtist(testTitle, testArtist)
    .then(data => {
      expect(data.track_list).to.be.a('array');
    });
  });

});