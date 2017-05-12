import React from 'react';
import renderIf from 'render-if';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.loading) return (<div></div>);
    return (
      <div>
        {renderIf(this.props.spotifyURI)(
          <div className="player" >
            <iframe src={"https://open.spotify.com/embed?uri=" + this.props.spotifyURI}
                    frameBorder="0" width="550" height="auto"/>
          </div>
        )}
      </div>
    );
  }
}

export default Player;
