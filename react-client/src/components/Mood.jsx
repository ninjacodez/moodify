import React from 'react';
import {Polar} from 'react-chartjs-2';

class Mood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        labels: ["Joy", "Fear", "Disgust", "Anger", "Sadness"],
        datasets: [{
            label: 'Kanye West - Famous',
            data: [0.8, 1.3, 1.5, 5.6, 6.1],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 3
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Kanye West - Famous',
          fontSize: 24
        }
      }
    };
  }

  render() {
    return (
      <div className="item">
      <h4>Mood Component</h4>
      <Polar data={this.state.data} options={this.state.options}/>
      </div>
    )
  }
}

export default Mood;