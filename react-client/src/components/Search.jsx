import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      artist: '',
      showPrev: false
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleArtistChange = this.handleArtistChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.prevResults = this.prevResults.bind(this);
  }

  handleTitleChange(e) { this.setState({ title: e.target.value }); }
  handleArtistChange(e) { this.setState({ artist: e.target.value }); }

  handleSubmit(e) {
    e.preventDefault();
    this.props.search(this.state.title, this.state.artist);
    this.setState({ title: '', artist: '', showPrev: true});
  }

  prevResults(e) {
    e.preventDefault();
    this.props.prev();
    this.props.runUpDown();
  }

  render() {
    return (
      <div>
      <div className="search">
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="title" value={this.state.title} placeholder="title" onChange={this.handleTitleChange} className="textbox"/>
          <input type="text" name="artist" value={this.state.artist} placeholder="artist" onChange={this.handleArtistChange} className="textbox"/>
          <input type="submit" value="Search" className="submitbutton"/>
          </form>
          <form>
          {this.props.showPrev ?
            <div className="resultsBar" onClick={this.prevResults} >
            <div className="searchHeadline">Search Results</div>
            {this.props.upDown ?
            <img className="searchPrevUp" src="./img/ic_down.svg" width="18" height="18"/>
            : <img className="searchPrevDown" src="./img/ic_up.svg" width="18" height="18"/>}
            </div>
            : null}
        </form>
        </div>
      </div>
    )
  }
}

export default Search;
