import React from 'react';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    let index = e.target.getAttribute('value');
    this.props.process(this.props.results[index].track);
  }

  render() {
    return (
      <div>
        <h4>Search Results:</h4>
        {this.props.results.map((trackObj, i) => (
          <div key={i} value={i} onClick={this.handleClick} >{trackObj.track.track_name} by {trackObj.track.artist_name}</div>
        ))}
      </div>
    )
  }
}

export default SearchResults;
