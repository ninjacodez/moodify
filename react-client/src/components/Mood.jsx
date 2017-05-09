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
            data: [
              props.watson.joy, 
              props.watson.fear, 
              props.watson.disgust, 
              props.watson.anger, 
              props.watson.sadness
              ],
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
            data: [props.watson.analytical, props.watson.confident, props.watson.tentative],
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
            data: [
              props.watson.openness, 
              props.watson.conscientiousness, 
              props.watson.extraversion, 
              props.watson.agreeableness, 
              props.watson.emotionalrange
              ],
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
componentWillReceiveProps(props) {
  this.setState({
      emotionData: {
        labels: ["Joy", "Fear", "Disgust", "Anger", "Sadness"],
        datasets: [{
            label: 'Kanye West - Famous',
            data: [
              props.watson.joy, 
              props.watson.fear, 
              props.watson.disgust, 
              props.watson.anger, 
              props.watson.sadness
              ],
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
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
            data: [props.watson.analytical, props.watson.confident, props.watson.tentative],
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
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
            data: [
              props.watson.openness, 
              props.watson.conscientiousness, 
              props.watson.extraversion, 
              props.watson.agreeableness, 
              props.watson.emotionalrange
              ],
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
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
      }
  })
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