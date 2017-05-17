import React from 'react';
import {Polar, Doughnut, Bar} from 'react-chartjs-2';
import data from '../../../sampleWatsonData.js';
import Recommendations from './Recommendations.jsx';

class MusicAnalysis extends React.Component {
  constructor(props) {
    super(props);

    // state?
  }
// componentWillReceiveProps(props) {
//   this.setState({})
// }

  render() {
    console.log('getting inside mood jsx')
    console.log('PROPS inside mood === ', this.props)
    return (
      <div className="maingraph">
      <h2>Music Analysis</h2>
      <Bar data={this.props.emotionData} options={this.props.emotionOptions} width={500}/>
      <Recommendations />
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