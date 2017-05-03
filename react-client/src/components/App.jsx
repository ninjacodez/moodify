import React from 'react';
import ReactDOM from 'react-dom';
import Lyrics from './Lyrics.jsx';
import Mood from './Mood.jsx';
import PlayList from './PlayList.jsx';
import Search from './Search.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    return (<div>
      <h1>Spot a tie, with lyrics</h1>
      <Search />
      <Lyrics />
      <Mood />
      <PlayList />
    </div>)
  }
}

export default App;