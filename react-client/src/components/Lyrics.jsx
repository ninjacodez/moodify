import React from 'react';
import Player from './Player.jsx';

class Lyrics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ' ',
      artist: ' '
    };
    console.log('this is the props', props)
  }

  render() {
    if (this.props.loading) {
      return (
        <div className="loading">
          <img alt="loading" src="./img/triangle.svg"/>
        </div>
      );
    } else {
      return (
        <div className="lyrics" >
          <h6>{this.props.songNameAndArtist[0] + ' - ' + this.props.songNameAndArtist[1]}</h6>
          {this.props.showPlayer ?
            <Player spotifyURI={this.props.spotifyURI} loading={this.props.loading}/>
          : null }
          <pre>{this.props.lyrics}</pre>
        </div>
      );
    }
  }
}

export default Lyrics;
