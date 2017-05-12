import React from 'react';
import axios from 'axios';
import PastSearchResults from './PastSearchResults.jsx';

class PastSearches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPrev: false
    };
    this.prevResults = this.prevResults.bind(this);
  }

  prevResults(e) {
    e.preventDefault();
    this.props.prev();
    this.props.runUpDown();
    this.setState({showPrev: true});
  }

  render() {
    return (
      <div className="searchUser">
        <form>
          <div className="resultsBar" onClick={this.prevResults} >
          <div className="searchHeadline">Previous searches...</div>
          {this.props.upDown ?
          <img className="searchPrevUp" src="./img/ic_down.svg" width="18" height="18"/>
          : <img className="searchPrevDown" src="./img/ic_up.svg" width="18" height="18"/>}
          </div>
        </form>
      </div>
    );
  }
}

export default PastSearches;
