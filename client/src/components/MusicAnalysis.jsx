import React from 'react';
import {Polar, Doughnut, Bar} from 'react-chartjs-2';
import data from '../../../sampleWatsonData.js';
import Recommendations from './Recommendations.jsx';

class MusicAnalysis extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      danceability: '',
      mood: '',
      energy: ''
    }
  }

  onChange(event) {
    this.setState({
      danceability: event.target.value,
      mood: event.target.value,
      energy: event.target.value
    });
  }

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

  // moodify() {

  // }

  render() {
    console.log('getting inside mood jsx')
    console.log('PROPS inside mood === ', this.props)
    {console.log('input values danceability, mood, enery === ', this.onChange.danceability, this.onChange.mood, this.onChange.enery)}
    return (
      <div className="maingraph">
      <h2>Music Analysis</h2>
      <Bar data={this.state.emotionData} options={this.state.emotionOptions} width={500}/>
      <div className="inputFields">
        <label>
        Danceability
        <input value={this.state.danceability} onChange={this.onChange.danceability} />
        </label>
        <label>
        Mood
        <input value={this.state.mood} onChange={this.onChange.mood} />
        </label>
        <label>
        Energy
        <input value={this.state.energy} onChange={this.onChange.energy} />
        </label>
      </div>
      <button>Moodify</button>
      <Recommendations  />
      </div>
    )
  }
}

export default MusicAnalysis;

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