import React from 'react';

class PastSearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    let index = e.target.getAttribute('value');
    this.props.loadPastSearchResults(this.props.results[index].track_id);
  }

  render() {
    if (this.props.loading) {
      return (
        <div className="loading">
          <img alt="loading" src="./img/triangle.svg"/>
        </div>
      );
    } else if (this.props.results.errorMessage) {
      return (
        <div className="errorMessage">{this.props.results.errorMessage}</div>
      );
    } else {
      return (
        <div className="resultsBox">
          {this.props.results.map((trackObj, i) => (
            <div className="searchText" key={i} value={i} onClick={this.handleClick} >
              {i+1}. {trackObj.track_name} by {trackObj.artist_name}
            </div>
          ))}
        </div>
      );
    }
  }
}

export default PastSearchResults;
