import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    return (<div id="header">
      <h3>Moodify</h3>
      <img id="mascot" src="./img/mood.png" />
      </div>)
  }
}

export default Header;