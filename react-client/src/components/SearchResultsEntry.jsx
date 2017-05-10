import React from 'react';

class SearchResultsEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    if (this.props.searchResultsLoading) {
      return (
        <div className="loading">
          <img alt="loading" src="./img/triangle.svg"/>
        </div>
      );
    } else {
      return (
        <div className="searchText">
          {this.props.results.map((trackObj, i) => (
            <div key={i} value={i} onClick={this.handleClick} >{trackObj.track.track_name} by {trackObj.track.artist_name}</div>
          ))}
        </div>
      );
    }
  }
}

export default SearchResultsEntry;
