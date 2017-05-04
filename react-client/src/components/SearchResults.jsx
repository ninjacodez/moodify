import React from 'react';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <h4>Search Results:</h4>
        {this.props.results.map((trackObj, i) => (
          <div key={i}>{trackObj.track.track_name} by {trackObj.track.artist_name}</div>
        ))}
      </div>
    )
  }
}

export default SearchResults;
