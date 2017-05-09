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
    if (this.props.loading) {
      return (
        <div className="loading">
          <h4>Lyrics: </h4>
          <img alt="loading" src="https://media.giphy.com/media/sSgvbe1m3n93G/giphy.gif"/>
        </div>
      );
    } else {
      return (
        <div className="item2" >
          <h4>Lyrics: </h4>
          {this.props.lyrics}
        </div>
      );
    }
  }
}

export default Lyrics;
