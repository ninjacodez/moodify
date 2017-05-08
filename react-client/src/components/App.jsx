import React from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery";
import Lyrics from './Lyrics.jsx';
import Mood from './Mood.jsx';
import PlayList from './PlayList.jsx';
import Search from './Search.jsx';
import SearchResults from './SearchResults.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLyrics: '',
      searchResults: []
    };
    this.search = this.search.bind(this);
    this.retrieveById = this.retrieveById.bind(this);
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

    $.post('./process', input)
    .done(data => {
      this.setState({
        currentLyrics: data.lyrics
        // moood: data.mood
      });
    })
    .fail(error => { throw error; })
  }

  // fetchLyrics(id) {
  //   let options = { trackId: id };
  //   $.post('/fetchLyricsByTrackId', options)
  //   .done((data) => {
  //     if (!data) { console.log('error'); };
  //     this.setState({
  //       currentLyrics: data
  //     });
  //   });
  // }


  // TO BE TESTED
  // fetch lyrics by submitting a post request to server when lyrics are not in the database
  // fetchLyrics(title, artist) {
  //   let options = {
  //     title: title,
  //     artist: artist
  //   };
  //   $.post('/saveLyricsByTitleAndArtist', options)
  //   .done((data) => {
  //     if (!data) { console.log('error'); };
  //     console.log('lyrics loaded');
  //     this.setState({
  //       currentLyrics: data
  //     });
  //   });
  // }

  render () {
    return (<div>
      <h1>Spot a tie, with lyrics. Test change!</h1>
      <Search search={this.search} />
      <SearchResults results={this.state.searchResults} retrieveById={this.retrieveById}/>
      <Lyrics lyrics={this.state.currentLyrics}/>
      <Mood />
      <PlayList />
    </div>)
  }
}

export default App;
