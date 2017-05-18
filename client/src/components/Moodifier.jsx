import React from 'react';
import axios from 'axios';
import {Polar, Doughnut, Bar} from 'react-chartjs-2';
import data from '../../../sampleWatsonData.js';
import Recommendations from './Recommendations.jsx';

class Moodifier extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      danceability: '',
      mood: '',
      energy: ''
    }

    this.danceability = this.danceability.bind(this);
    this.mood = this.mood.bind(this);
    this.energy = this.energy.bind(this);
  }

  danceability(event) {
    this.setState({
      danceability: event.target.value,
    });
  }

  mood(event) {
    this.setState({
      mood: event.target.value,
    });
  }

  energy(event) {
    this.setState({
      energy: event.target.value,
    });
  }

  // pass danceability, mood, energy values to moodify?

// searchArtist(artistSearch) {
//     const context = this;
//     const dataObj = {
//       artistName: artistSearch
//     }
//     $.get('/songs', dataObj, function(songsFound) {
//       if (songsFound.length === 0) {
//         alert('Artist not found!');
//         return;
//       }
//       context.setState({
//         songs: songsFound
//       });
//     });
//   }

  moodify() {
  // declare a queries object and set danceability, mood and enery as properties on it
    const queries = {
      danceability: this.state.danceability,
      mood: this.state.mood,
      energy: this.state.energy
    }
  // make an ajax request to the server '/moodify'
  // send the queries object to the server
    axios.post('/moodify', queries).then(res => {
      const data = res.data;
  // display the results returned from the server in the chart
      this.setState({
        showDanceability: true,
        showMood: true,
        showEnergy: true
      });
    }).catch(error => {
      throw error;
    });
// set a uris property on the Recommendations component and set it's value to uris returned from  the server

  }

  render() {
    console.log('getting inside mood jsx')
    console.log('PROPS inside moodifier === ', this.props)

    return (
      <div className="maingraph">
      <h2>Music Analysis</h2>
      <Bar data={this.props.emotionData} options={this.state.emotionOptions} width={500}/>
      <div className="inputFields">
        <label>
        Danceability
        <input value={this.state.danceability} type="text" onChange={this.danceability} />
        </label>
        <label>
        Mood
        <input value={this.state.mood} type="text" onChange={this.mood} />
        </label>
        <label>
        Energy
        <input value={this.state.energy} type="text" onChange={this.energy} />
        </label>
      </div>
      <button onSubmit={this.moodify} >Moodify</button>
      <Recommendations />
      </div>
    );
  }
}

export default Moodifier;

/*
return (
  <div className="maingraph">
  <h2>Music Analysis</h2>
  <Bar data={this.state.emotionData} options={this.state.emotionOptions} width={500}/>
  <div className="maingraph">
  <h5>Social</h5>
  <Polar data={this.state.socialData} options={this.state.socialData} width={500}/>
  </div>
  <div className="maingraph">
  <h5>Language</h5>
  <Doughnut data={this.state.languageData} options={this.state.languageOptions} width={500}/>
  </div>
  </div>
)
*/