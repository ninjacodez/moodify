import React from 'react';
import axios from 'axios';

class PastSearches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songArray: []
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    axios.get('/pastSearches')
    .then(res => {
      this.setState({ songArray: res.data });
    })
    .catch(err => { console.log(err)})
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Past Searches</button>
        {this.state.songArray.map((song, i) => {
          return (
            <div key={i}> {song.track_name} by {song.artist_name} </div>
          );
        })}
      </div>
    );
  }
}

export default PastSearches;
