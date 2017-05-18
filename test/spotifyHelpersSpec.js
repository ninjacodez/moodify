const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const rewire = require('rewire');
const spotifyHelpers = rewire('../server/spotifyHelpers');

const expect = chai.expect;
chai.use(chaiAsPromised);

describe( 'spotify API:', function() {

  describe( 'requestAccessToken', function() {

    it( 'should get a new authentication token from spotify', function () {
    });
  });

  describe( 'getSongByTitleAndArtist', function() {

    it( 'should return the correct spotify URI', function() {

      const testTitle = 'like a rolling stone';
      const testArtist = 'the rolling stones';

      return expect(spotifyHelpers.getSongByTitleAndArtist(testTitle, testArtist)).to.eventually.equal('spotify:track:0oXnmfo2kW3joSeiXoazdV');
    });

  });


});
