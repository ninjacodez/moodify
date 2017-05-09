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
  }

  render() {
    return (
      <div>
      <div className="search">
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="title" value={this.state.title} placeholder="title" onChange={this.handleTitleChange} />
          <input type="text" name="artist" value={this.state.artist} placeholder="artist" onChange={this.handleArtistChange} />
          <input type="submit" value="Search" className="submitbutton"/>
          {this.state.showPrev ?
          <img className="searchPrev" onClick={this.prevResults} src="./img/ic_expand_more_48px.svg" width="18" height="18"/>
        : null}
        </form>
        </div>
      <div className="searchPrev">
        {this.state.showPrev ?
        <form onSubmit={this.prevResults} className="prevbutton">
          <input type="submit" value="Search Results" className="prevbutton"/>
        </form>
        : null}
      </div>
      </div>
    )
  }
}

export default Search;

//<input type="submit" value="Search Results" className="prevbutton"/>
