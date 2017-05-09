import React from 'react';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    if (this.props.loading) {
      return (
        <div className="loading">
          <img alt="loading" src="https://media.giphy.com/media/sSgvbe1m3n93G/giphy.gif"/>
        </div>
      );
    } else {
      return (
        <div className="player" >
          <iframe src= {"https://open.spotify.com/embed?uri=" + this.props.spotifyURI} />
        </div>
      );
    }
  }
}

export default Player;
