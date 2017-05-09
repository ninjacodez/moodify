import React from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery";
import Lyrics from './Lyrics.jsx';
import Mood from './Mood.jsx';
import Player from './Player.jsx';
import Search from './Search.jsx';
import SearchResults from './SearchResults.jsx';
import Header from './Header.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLyrics: '',
      watson: {},
      spotifyURI: '',
      searchResults: [],
      searchResultsLoading: false,
      spotifyLoading: false,
      lyricsLoading: false
    };
    this.search = this.search.bind(this);
    this.process = this.process.bind(this);
  }

  search(title, artist) {
    this.setState({
      searchResults: [],
      searchResultsLoading: true
    });

    let options = { title: title, artist: artist };
    $.post('/search', options)
    .done((data) => {
      if (!data) { console.log('error'); };
      this.setState({
        searchResults: data.track_list, //track_list is an array of objs
        searchResultsLoading: false
      });
    });
  }

  process(trackObj) {
    this.setState({
      spotifyLoading: true,
      lyricsLoading: true
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
        currentLyrics: data[0],
        watson: data[1],
        spotifyURI: data[2],
        spotifyLoading: false,
        lyricsLoading: false
      });
    })
    .fail(error => { throw error; })
  }

  render () {
    return (
      <div>
      <Header />
      <div className="container">
      <div className="col1">
      <Search search={this.search} />
      <SearchResults
        results={this.state.searchResults}
        process={this.process}
        searchResultsLoading={this.state.searchResultsLoading} />
      </div>
      <div className="col2">
      <Mood watson={this.state.watson}/>
      </div>
      <div className="col3">
      <Player spotifyURI={this.state.spotifyURI} loading={this.state.spotifyLoading}/>
      <Lyrics lyrics={this.state.currentLyrics} loading={this.state.lyricsLoading}/>
      </div>
    </div></div>)
  }
}

export default App;
