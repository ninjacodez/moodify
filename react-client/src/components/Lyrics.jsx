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
        <h4>Lyrics Component</h4>
        <pre>{this.props.lyrics}</pre>
      </div>
    )
  }
}

export default Lyrics;