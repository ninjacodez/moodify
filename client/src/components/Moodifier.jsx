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
      energy: '',
      mood: '',
      songURIs: [],
      dummyd: {
        songName: 'hello',
        artistName: 'Adele'
      }
    }

    this.danceability = this.danceability.bind(this);
    this.energy = this.energy.bind(this);
    this.mood = this.mood.bind(this);
  }

  danceability(event) {
    this.setState({
      danceability: event.target.value
    });
  }

  energy(event) {
    this.setState({
      energy: event.target.value
    });
  }

  mood(event) {
    this.setState({
      mood: event.target.value
    });
  }

  moodify() {
  // declare a queries object and set danceability, mood and enery as properties on it
    const queries = {
      danceability: this.state.danceability,
      mood: this.state.mood,
      energy: this.state.energy,
      spotifyURI: this.props.spotifyURI
    }
    axios.post('/moodify', queries).then(res => {
      const data = res.data;

      this.setState({
        songURIs: data.uris
      })
      .catch(error => {
        throw error;
      });
    });
  }

  render() {
  //   console.log('getting inside moodifier jsx');
    console.log('PROPS inside moodifier === ', this.props);
    // console.log('spotifyURI inside moodifier === ', this.props.spotifyURI);
    return (
      <div className="maingraph">
      <h2>Music Analysis</h2>
      <Bar data={this.props.spotifyAnalysis} options={this.state.emotionOptions} width={500}/>
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
      <button onClick={this.moodify} >Moodify</button>
      <Recommendations songUris={this.state.songUris} dummyd={this.state.dummyd} spotifyURI={this.props.spotifyURI} />
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