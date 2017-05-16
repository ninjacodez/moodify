// dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Switch, Route, Link} from 'react-router-dom';
// sub components
import Lyrics from './Lyrics.jsx';
import Mood from './Mood.jsx';
import Player from './Player.jsx';
import Search from './Search.jsx';
import Header from './Header.jsx';
import SearchResults from './SearchResults.jsx';
import User from './User.jsx';
import LoginSignup from './LoginSignup.jsx';
import PastSearchResults from './PastSearchResults.jsx';
import sampleSpotify from '../../../spotify_new_release_sample_data.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSongNameAndArtist: [],
      currentLyrics: '',
      watson: {},
      spotifyURI: null,
      searchResults: [],
      searchResultsUser: [],
      searchResultsLoading: false,
      spotifyLoading: false,
      lyricsLoading: false,
      showPlayer: false,
      showLyrics: false,
      showMood: false,
      showResults: false,
      showResultsUser: false,
      showPrev: false,
      upDown: true,
      url: window.location.href,
      loggedIn: false,
      upDownUser: false,
      searchResultsLoadingUser: false,
      spotifyHomePage: sampleSpotify.albums.items,
    };
    console.log('this all the props', this.state)
    this.search = this.search.bind(this);
    this.process = this.process.bind(this);
    this.showResults = this.showResults.bind(this);
    this.upDown = this.upDown.bind(this);
    this.upDownUser = this.upDownUser.bind(this);
    this.showResultsUser = this.showResultsUser.bind(this);
    this.loadPastSearchResults = this.loadPastSearchResults.bind(this);
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
      showPlayer: true,
      spotifyLoading: true,
      lyricsLoading: true,
      showResults: false,
      showResultsUser: false,
      upDownUser: false,
      showLyrics: false,
      showMood: false,
      upDown: true
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
        currentSongNameAndArtist: data[0],
        currentLyrics: data[1],
        watson: data[2],
        spotifyURI: data[3],
        spotifyLoading: false,
        lyricsLoading: false,
        showLyrics: true,
        showMood: true
      });
    }).catch(error => {
      throw error;
    });
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

  render() {
    return (
      <div>
        <Header url={this.state.url}/>
        <div className="container">
          <div className="col1">
            <Search search={this.search} prev={this.showResults} showPrev={this.state.showPrev} upDown={this.state.upDown} runUpDown={this.upDown}/> {this.state.showResults
              ? <SearchResults results={this.state.searchResults} process={this.process} searchResultsLoading={this.state.searchResultsLoading}/>
              : null}

              {/* add component for top 10 here*/}
              {!this.state.showResults ?
                <div className='test'>
                  top ten songs component.
                </div>
              : null}

            {this.state.showPlayer
              ? <Lyrics showPlayer={this.state.showPlayer} spotifyURI={this.state.spotifyURI} loading={this.state.spotifyLoading} lyrics={this.state.currentLyrics} loading={this.state.lyricsLoading} songNameAndArtist={this.state.currentSongNameAndArtist}/>
              : null}
          </div>
          <div className="col2">
            <User showPrev={this.state.showResultsUser} prev={this.showResultsUser} upDown={this.state.upDownUser} runUpDown={this.upDownUser} process={this.process} searchResultsLoading={this.state.searchResultsLoadingUser} loadPastSearchResults={this.loadPastSearchResults}/> {this.state.showMood
              ? <Mood watson={this.state.watson} songNameAndArtist={this.state.currentSongNameAndArtist}/>
              : null}

              {/* add component for top 10 mood here*/}
              {!this.state.showResults ?
                <div className='test'>
                  show top ten mood component.
                </div>
              : null}

          </div>
        </div>
      </div>
    );
  }
}

export default App;
