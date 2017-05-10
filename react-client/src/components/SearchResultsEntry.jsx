import React from 'react';

class SearchResultsEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.click = this.click.bind(this);
  }

  click(e) {
    console.log(e.target.value);
    this.props.onClick(e);
  }

  render() {
    return (
      <div className="searchResultEntry" onClick={this.click}>
    {this.props.track.track.track_name} by {this.props.track.track.artist_name}
    </div>)
  }
}

export default SearchResultsEntry;
