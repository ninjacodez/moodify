import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      artist: '',
      selection: null,
      showPrev: false
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleArtistChange = this.handleArtistChange.bind(this);
    this.handleRadioSelect = this.handleRadioSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.prevResults = this.prevResults.bind(this);
  }

  handleTitleChange(e) { this.setState({ title: e.target.value }); }
  handleArtistChange(e) { this.setState({ artist: e.target.value }); }
  handleRadioSelect(e) { this.setState({ selection: e.target.value}); }

  handleSubmit(e) {
    console.log(this.state.selection);
    e.preventDefault();
    if (this.state.selection !== null) {
      this.props.search(this.state.title, this.state.artist, this.state.selection);
      this.setState({ title: '', artist: '', showPrev: true});
    } else {
      alert('Please select a media to search!');
    }
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
            <input type="text"
                   name="song title"
                   value={this.state.title}
                   placeholder="title"
                   onChange={this.handleTitleChange}
                   className="textbox"/>
            <input type="text" name="Artist"
                   value={this.state.artist}
                   placeholder="artist"
                   onChange={this.handleArtistChange}
                   className="textbox"/>
            <input onChange={this.handleRadioSelect} type="radio" name="media" value="/search"/> Song  
            <input onChange={this.handleRadioSelect} type="radio" name="media" value="/books"/> Book
            <button id="ilovecats" onClick={this.handleSubmit} className="submitbutton">Search</button>
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
    );
  }
}

export default Search;


/*
          <form onSubmit={this.bookSubmit}>
          <input type="text" 
                 name="title" 
                 value={this.state.bookTitle} 
                 placeholder="book title" 
                 onChange={this.handleBookTitleChange} 
                 className="textbox"/>
          <input type="text" 
                 name="Author" 
                 value={this.state.author} 
                 placeholder="author" 
                 onChange={this.handleAuthorChange} 
                 className="textbox"/>
          <input type="submit" value="Search" className="submitbutton"/>
          </form>
*/
