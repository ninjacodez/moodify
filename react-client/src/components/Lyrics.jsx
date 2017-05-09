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
      <div className="item2" >
        <h4>Lyrics: </h4>
        {this.props.lyrics}
      </div>
    )
  }
}

export default Lyrics;