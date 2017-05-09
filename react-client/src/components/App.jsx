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
      searchResults: []
    };
    this.search = this.search.bind(this);
    this.process = this.process.bind(this);
  }

  search(title, artist) {
    this.setState({ searchResults: [] });

    let options = { title: title, artist: artist };
    $.post('/search', options)
    .done((data) => {
      if (!data) { console.log('error'); };
      this.setState({
        searchResults: data.track_list //track_list is an array of objs

      });
    });
  }

  process(trackObj) {
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
        spotifyURI: data[2]
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
      <SearchResults results={this.state.searchResults} process={this.process} />
      </div>
      <div className="col2">
      <Mood watson={this.state.watson}/>
      </div>
      <div className="col3">
      <Lyrics lyrics={this.state.currentLyrics} />
      <Player spotifyURI={this.state.spotifyURI} />
      </div>
    </div></div>)
  }
}

export default App;
