import React from 'react';
import {Polar, Doughnut, Bar} from 'react-chartjs-2';
import data from '../../../sampleWatsonData.js';

class Mood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emotionData: {
        labels: ["Anger", "Joy", "Disgust", "Sadness", "Fear"],
        datasets: [{
            label: 'Kanye West - Famous',
            data: [data.anger, data.joy, data.disgust, data.sadness, data.fear],
            backgroundColor: [
                'rgba(206, 17, 38, 1)',
                'rgba(242, 175, 0, 1)',
                'rgba(122, 184, 0, 1)',
                'rgba(0, 155, 187, 1)',
                'rgba(110, 37, 133, 1)',
            ],
            borderColor: [
                'rgba(206, 17, 38, 1)',
                'rgba(242, 175, 0, 1)',
                'rgba(122, 184, 0, 1)',
                'rgba(0, 155, 187, 1)',
                'rgba(110, 37, 133, 1)',
            ],
            borderWidth: 3
        }]
      },
      emotionOptions: {
        title: {
          display: false,
          text: 'Kanye West - Famous',
          fontSize: 24
        },
      },
      languageData: {
        labels: ["Analytical", "Confident", "Tentative"],
        datasets: [{
            label: 'Kanye West - Famous',
            data: [data.analytical, data.confident, data.tentative],
            backgroundColor: [
                'rgba(206, 17, 38, 1)',
                'rgba(242, 175, 0, 1)',
                'rgba(122, 184, 0, 1)'
            ],
            borderColor: [
                'rgba(206, 17, 38, 1)',
                'rgba(242, 175, 0, 1)',
                'rgba(122, 184, 0, 1)'
            ],
            borderWidth: 3
        }]
      },
      languageOptions: {
        title: {
          display: false,
          text: 'Kanye West - Famous',
          fontSize: 24
        }
      },
      socialData: {
        labels: ["Openness", "Conscientiousness", "Extraversion", "Agreeableness", "Emotional Range"],
        datasets: [{
            label: 'Kanye West - Famous',
            data: [data.openness, data.conscientiousness, data.extraversion, data.agreeableness, data.emotionalrange],
            backgroundColor: [
                'rgba(206, 17, 38, 1)',
                'rgba(242, 175, 0, 1)',
                'rgba(122, 184, 0, 1)',
                'rgba(0, 155, 187, 1)',
                'rgba(110, 37, 133, 1)',
            ],
            borderColor: [
                'rgba(206, 17, 38, 1)',
                'rgba(242, 175, 0, 1)',
                'rgba(122, 184, 0, 1)',
                'rgba(0, 155, 187, 1)',
                'rgba(110, 37, 133, 1)',
            ],
            borderWidth: 3
        }]
      },
      socialOptions: {
        title: {
          display: false,
          text: 'Kanye West - Famous',
          fontSize: 24
        }
      },
    };
  }

  render() {
    return (
      <div className="item">
      <h5>Emotion</h5>
      <Bar data={this.state.emotionData} options={this.state.emotionOptions} width={500}/>
      <div className="minicol1">
      <h5>Language</h5>
      <Doughnut data={this.state.languageData} options={this.state.languageOptions} width={300}/>
      </div>
      <div className="minicol2">
      <h5>Social</h5>
      <Polar data={this.state.socialData} options={this.state.socialData} width={300}/>
      </div>
      </div>
    )
  }
}

export default Mood;