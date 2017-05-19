// dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Switch, Route, Link} from 'react-router-dom';
// sub components
import Lyrics from './Lyrics.jsx';
import LyricsAnalysis from './LyricsAnalysis.jsx';
import Player from './Player.jsx';
import Search from './Search.jsx';
import Header from './Header.jsx';
import SearchResults from './SearchResults.jsx';
import User from './User.jsx';
import LoginSignup from './LoginSignup.jsx';
import PastSearchResults from './PastSearchResults.jsx';
import AnalysisTabs from './AnalysisTabs.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLyrics: '',
      currentSongNameAndArtist: [],
      loggedIn: false,
      lyricsLoading: false,
      searchResults: [],
      searchResultsLoading: false,
      searchResultsLoadingUser: false,
      searchResultsUser: [],
      showLyrics: false,
      showMood: false,
      showPlayer: false,
      showPrev: false,
      showResults: false,
      showResultsUser: false,
      spotifyAnalysis: null,
      spotifyLoading: false,
      spotifyURI: null,
      upDown: true,
      upDownUser: false,
      url: window.location.href,
      watson: {}
    };

    this.loadPastSearchResults = this.loadPastSearchResults.bind(this);
    this.process = this.process.bind(this);
    this.search = this.search.bind(this);
    this.showResults = this.showResults.bind(this);
    this.showResultsUser = this.showResultsUser.bind(this);
    this.upDown = this.upDown.bind(this);
    this.upDownUser = this.upDownUser.bind(this);
  }

  search(title, artist) {
    this.setState({showResults: true, searchResultsLoading: true, showPrev: true, upDown: false});

    let options = {
      title: title,
      artist: artist
    };
    axios.post('/search', options).then((res) => {
      if (!res.data) {
        console.log('error');
      }
      this.setState({searchResults: res.data, searchResultsLoading: false});
    });
  }

  process(trackObj) {
    this.setState({
      lyricsLoading: true,
      showLyrics: false,
      showMood: false,
      showPlayer: true,
      showResults: false,
      showResultsUser: false,
      spotifyLoading: true,
      upDown: true,
      upDownUser: false
    });

    let input = {};
    input.track_id = trackObj.track_id;
    input.track_name = trackObj.track_name;
    input.artist_name = trackObj.artist_name;
    input.album_coverart_100x100 = trackObj.album_coverart_100x100;
    input.album_coverart_350x350 = trackObj.album_coverart_350x350;
    input.album_coverart_500x500 = trackObj.album_coverart_500x500;
    input.album_coverart_800x800 = trackObj.album_coverart_800x800;

    axios.post('/process', input).then(res => {
      let data = res.data;
      this.setState({
        currentLyrics: data[1],
        currentSongNameAndArtist: data[0],
        lyricsLoading: false,
        showLyrics: true,
        showMood: true,
        spotifyAnalysis: data[4],
        spotifyLoading: false,
        spotifyURI: data[3],
        watson: data[2],
      });
    }).catch(error => {
      throw error;
    });
  }

  loadPastSearchResults(trackId) {
    axios.post('/loadPastSearchResults', {track_id: trackId}).then(res => {
      let songData = res.data[0];
      let watsonData = res.data[1];
      console.log(watsonData);
      this.setState({
        currentLyrics: songData.lyrics,
        currentSongNameAndArtist: [
          songData.track_name, songData.artist_name
        ],
        watson: watsonData,
        spotifyURI: songData.spotify_uri,
        showMood: true,
        showPlayer: true,
        showLyrics: true
      });
    }).catch(err => console.log(err));
  }

  showResults() {
    this.setState({
      showResults: !this.state.showResults
    });
  }

  showResultsUser() {
    this.setState({
      showResultsUser: !this.state.showResultsUser
    });
  }

  upDown() {
    this.setState({
      upDown: !this.state.upDown
    });
  }

  upDownUser() {
    this.setState({
      upDownUser: !this.state.upDownUser
    });
  }

  render() {
    return (
      <div>
        <Header url={this.state.url}/>
        <div className="container">
          <div className="col1">
            <Search
              search={this.search}
              prev={this.showResults}
              showPrev={this.state.showPrev}
              upDown={this.state.upDown}
              runUpDown={this.upDown}
            />
            {this.state.showResults ? // if show results is true, render SearchResults, otherwise nothing
              <SearchResults
                results={this.state.searchResults}
                process={this.process}
                searchResultsLoading={this.state.searchResultsLoading}
              />
            : null}
            {this.state.showPlayer ? // if showPlayer is true, render Lyrics, otherwise nothing
            <Lyrics
              showPlayer={this.state.showPlayer}
              spotifyURI={this.state.spotifyURI}
              loading={this.state.spotifyLoading}
              lyrics={this.state.currentLyrics}
              loading={this.state.lyricsLoading}
              songNameAndArtist={this.state.currentSongNameAndArtist}
            />
            : null}
          </div>
          <div className="col2">
            <User
              showPrev={this.state.showResultsUser}
              prev={this.showResultsUser}
              upDown={this.state.upDownUser}
              runUpDown={this.upDownUser}
              process={this.process}
              searchResultsLoading={this.state.searchResultsLoadingUser}
              loadPastSearchResults={this.loadPastSearchResults}
            />
            <AnalysisTabs
              spotifyAnalysis={this.state.spotifyAnalysis}
              spotifyURI={this.state.spotifyURI}
              watson={this.state.watson}
              songNameAndArtist={this.state.currentSongNameAndArtist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
