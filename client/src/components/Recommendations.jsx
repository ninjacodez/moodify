import React from 'react';

class Recommendations extends React.Component {
  constructor(props) {
    super(props);

    // state? yes maybe - only when clicked on should it appear???
  }

  // onChange(event) {
  //   this.setState({
  //     artistSearch: event.target.value
  //   });
  // }

  // search() {
  //   this.props.onSearch(this.state.artistSearch);
  //   console.log('clicked');
  // }

  render() {
    return (
      <div id="react-tabs">
        <h2>Recommendations</h2>
        <iframe src="https://open.spotify.com/embed?uri=spotify:track:49edox3q89CG1g6rJVfmHE" width="300" height="100" frameborder="0" allowtransparency="true"></iframe>

        <iframe src="https://open.spotify.com/embed?uri=spotify:track:49edox3q89CG1g6rJVfmHE" width="300" height="100" frameborder="0" allowtransparency="true"></iframe>

        <iframe src="https://open.spotify.com/embed?uri=spotify:track:49edox3q89CG1g6rJVfmHE" width="300" height="100" frameborder="0" allowtransparency="true"></iframe>

        <iframe src="https://open.spotify.com/embed?uri=spotify:track:49edox3q89CG1g6rJVfmHE" width="300" height="100" frameborder="0" allowtransparency="true"></iframe>
      </div>
    );
  }
};

export default Recommendations;