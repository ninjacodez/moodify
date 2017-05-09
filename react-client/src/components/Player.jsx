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
          <img alt="loading" src="./img/triangle.gif"/>
        </div>
      );
    } else {
      return (
        <div className="player" >
          <iframe src={"https://open.spotify.com/embed?uri=" + this.props.spotifyURI}
          frameBorder="0" width="600" height="auto"/>
        </div>
      );
    }
  }
}

export default Player;
