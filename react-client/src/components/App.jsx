import React from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery";
import Lyrics from './Lyrics.jsx';
import Mood from './Mood.jsx';
import Player from './Player.jsx';
import Search from './Search.jsx';
import SearchResults from './SearchResults.jsx';
import Header from './Header.jsx';
import LoginSignup from './LoginSignup.jsx';
import { Switch, Route, Link } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSongNameAndArtist: [],
      currentLyrics: '',
      watson: {},
      spotifyURI: '',
      searchResults: [],
      searchResultsLoading: false,
      spotifyLoading: false,
      lyricsLoading: false,
      showPlayer: false,
      showLyrics: false,
      showMood: false,
      showResults: false
    };
    this.search = this.search.bind(this);
    this.process = this.process.bind(this);
    this.showResults = this.showResults.bind(this);
  }

  search(title, artist) {
    this.setState({
      showResults: true,
      searchResultsLoading: true,
      showPlayer: false,
    });

    let options = { title: title, artist: artist };
    $.post('/search', options)
    .done((data) => {
      if (!data) { console.log('error'); };
      this.setState({
        searchResults: data.track_list, //track_list is an array of objs
        searchResultsLoading: false,
        currentSongNameAndArtist: ['', ''],
        // currentLyrics: '',
        // watson: {},
        // spotifyURI: ''
      });
    });
  }

  process(trackObj) {
    this.setState({
      showPlayer: true,
      spotifyLoading: true,
      lyricsLoading: true,
      showResults: false,
      showLyrics: false,
      showMood: false
    });

    let input = {};
    input.track_id = trackObj.track_id;
    input.track_name = trackObj.track_name;
    input.artist_name = trackObj.artist_name;
    input.album_coverart_100x100 = trackObj.album_coverart_100x100;
    input.album_coverart_350x350 = trackObj.album_coverart_350x350;
    input.album_coverart_500x500 = trackObj.album_coverart_500x500;
    input.album_coverart_800x800 = trackObj.album_coverart_800x800;

    $.post('/process', input)
    .done(data => {
      console.log(data);
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
    })
    .fail(error => { throw error; })
  }

  showResults () {
    this.setState({
      showResults: !this.state.showResults
    });
  }

  render () {
    return (
      <div>
      <Header />
      <div className="container">
      <div className="col1">
      <Search search={this.search}
      prev={this.showResults} />
      {this.state.showResults ?
      <SearchResults
        results={this.state.searchResults}
        process={this.process}
        searchResultsLoading={this.state.searchResultsLoading} />
        : null}
      {this.state.showPlayer ?
      <Lyrics lyrics={this.state.currentLyrics} loading={this.state.lyricsLoading}
      songNameAndArtist={this.state.currentSongNameAndArtist} />
        : null }
      </div>
      <div className="col2">
      <User />
      {this.state.showPlayer ?
      <Player spotifyURI={this.state.spotifyURI} loading={this.state.spotifyLoading}/>
        : null }
      {this.state.showMood ?
      <Mood watson={this.state.watson} songNameAndArtist={this.state.currentSongNameAndArtist} />
        : null }
      </div>
    </div></div>)
  }
}

export default App;
