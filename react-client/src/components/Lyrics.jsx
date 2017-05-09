import React from 'react';

class Lyrics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      artist: ''
    };
  }

  render() {
      return (
        <div className="player" >
          <pre>{this.props.lyrics}</pre>
        </div>
      );
    }
}

export default Lyrics;
