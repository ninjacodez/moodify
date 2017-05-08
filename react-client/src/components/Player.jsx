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
        <iframe src= {this.props.spotifyURI}
                frameborder="0"
                allowtransparency="true">
        </iframe>
      </div>
    )
  }
}

export default Player;
