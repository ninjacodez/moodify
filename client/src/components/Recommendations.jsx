import React from 'react';

class Recommendations extends React.Component {
  constructor(props) {
    super(props);

    // state? yes maybe - only when clicked on should it appear???
  }

  render() {
    console.log('Props in Recommendations === ', this.props)
    return (
      <div >
        <h2>Recommendations</h2>
        <p>{this.props.dummyd.songName + ' ' + this.props.dummyd.artistName}</p>
        <p>{this.props.dummyd.songName + ' ' + this.props.dummyd.artistName}</p>
        <p>{this.props.dummyd.songName + ' ' + this.props.dummyd.artistName}</p>
        <p>{this.props.dummyd.songName + ' ' + this.props.dummyd.artistName}</p>
      </div>
    );
  }
};

export default Recommendations;