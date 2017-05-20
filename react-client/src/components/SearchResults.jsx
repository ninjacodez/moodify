import React from 'react';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleClick = this.handleClick.bind(this);
    this.handlePlaylist = this.handlePlaylist.bind(this);
  }

  handleClick(e) {

    let index = e.target.getAttribute('value');//this ternary should send song and/or book to process method.check with internet
    let toWatson = this.props.results.track_list ? this.props.results.track_list[index].track
                                                 : this.props.results[index];
    console.log('index: ', index);
    console.log('watson: ', toWatson);

    this.props.process(toWatson);

  }

  handlePlaylist (e) {
  console.log('I am in SearchResults and working????????????????????????')
   let songArtist = e.target.getAttribute('value');
   let sendIt = songArtist.split(',');
   this.props.recentlyPlayedSongs(sendIt);
  }

  render() {
    if (this.props.searchResultsLoading) {
      return (
        <div className="loading">
          <img alt="loading" src="./img/triangle.svg"/>
        </div>
      );
    } else if (this.props.results.errorMessage) {
      return (
        <div className="errorMessage">{this.props.results.errorMessage}</div>
      );
    } else if ( this.props.recent ) {
       return (
        <div className="resultsBox"> 
          <h1>Recently Played</h1> 
          {this.props.results.track_list.map((trackObj, i) => (
            <div className='searchText' key={i} value={[trackObj.track.track_name, trackObj.track.artist_name]} onClick={this.handlePlaylist} > 
            {i + 1}. {trackObj.track.track_name} - {trackObj.track.artist_name}</div>
          ))}
        </div>
        )
    }else {
      return (
        <div className="resultsBox">
          {this.props.results.track_list ?  this.props.results.track_list.map((trackObj, i) => (
            <div className='searchText' key={i} value={i} onClick={this.handleClick} > {i + 1}. {trackObj.track.track_name} - {trackObj.track.artist_name}</div>
          )) : this.props.results.map((book, i) => (
            <div className='searchText' key={i} value={i} onClick={this.handleClick} > {i + 1}. {book.volumeInfo.title} - {book.volumeInfo.authors ? book.volumeInfo.authors[0] : 'No author'}</div>
          ))}
        </div>
      );
    }
  }
}

export default SearchResults;
