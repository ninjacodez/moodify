import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      artist: ''
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleArtistChange = this.handleArtistChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitleChange(e) { this.setState({ title: e.target.value }); }
  handleArtistChange(e) { this.setState({ artist: e.target.value }); }

  handleSubmit(e) {
    e.preventDefault();
    this.props.search(this.state.title, this.state.artist);
  }

  render() {
    return (
      <div>
        <h4>Search Component</h4>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="title" value={this.state.title} placeholder="title" onChange={this.handleTitleChange} />
          <input type="text" name="artist" value={this.state.artist} placeholder="artist" onChange={this.handleArtistChange} />
          <input type="submit" value="Search"/>
        </form>
      </div>
    )
  }
}

export default Search;
