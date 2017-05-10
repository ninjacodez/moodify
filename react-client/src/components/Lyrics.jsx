import React from 'react';

class Lyrics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ' ',
      artist: ' '
    };
  }

  render() {
      return (
        <div className="lyrics" >
          <h6>{this.props.songNameAndArtist[0] + ' - ' + this.props.songNameAndArtist[1]}</h6>
          <pre>{this.props.lyrics}</pre>
        </div>
      );
    }
}

export default Lyrics;
