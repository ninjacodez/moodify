const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const rewire = require('rewire');
const spotify = rewire('../server/service/spotify');

const expect = chai.expect;
chai.use(chaiAsPromised);

describe( 'spotify API', function() {

  describe( 'requestAccessToken', function() {

    it( 'should get a new authentication token from spotify', function () {
      const origToken = spotify.__get__('axios').defaults.headers.common['Authorization'];
      return spotify.__get__('requestAccessToken')()
      .then( () => {
        const newToken = spotify.__get__('axios').defaults.headers.common['Authorization'];
        expect(newToken).to.not.equal(origToken);
      });
    });
  });

  describe( 'getSongByTitleAndArtist', function() {

    it( 'should return the correct spotify URI', function() {

      const testTitle = 'like a rolling stone';
      const testArtist = 'the rolling stones';

      return expect(spotify.getSongByTitleAndArtist(testTitle, testArtist)).to.eventually.equal('spotify:track:0oXnmfo2kW3joSeiXoazdV');
    });
  });

  describe( 'getTrackAnalysis', function() {

    let result;

    before( function() {
      const trackId = '0oXnmfo2kW3joSeiXoazdV';
      return spotify.getTrackAnalysis( trackId )
      .then( res => {
        result = res;
      })
      .catch( err => {
        console.log( err );
      });
    });

    it( 'should return results in the expected format', function() {
      expect(result).to.be.an('object');
      expect(result.danceability).to.not.be.undefined;
      expect(result.energy).to.not.be.undefined;
      expect(result.mood).to.not.be.undefined;
    });

    it( 'should return results in the expected range', function() {
      expect(result.danceability).to.be.within(-1, 1);
      expect(result.energy).to.be.within(-1, 1);
      expect(result.mood).to.be.within(-1, 1);
    });
  });

});
