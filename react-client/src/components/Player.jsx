import React from 'react';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="player" >
        <h4>Player Component</h4>
        <iframe src= {'https://open.spotify.com/embed?uri=' + this.props.spotifyURI}
                frameborder="0"
                allowtransparency="true">
        </iframe>
      </div>
    )
  }
}

export default Player;
