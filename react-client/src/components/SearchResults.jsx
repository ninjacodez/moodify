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
    if (this.props.searchResultsLoading) {
      return (
        <div className="loading">
          <img alt="loading" src="./img/triangle.svg"/>
        </div>
      );
    } else {
      return (
        <div className="resultsBox">
          {this.props.results.map((trackObj, i) => (
            <div className="searchText" key={i} value={i} onClick={this.handleClick} >{i+1}. {trackObj.track.track_name} - {trackObj.track.artist_name}</div>
          ))}
        </div> 
      );
    }
  }
}

export default SearchResults;
