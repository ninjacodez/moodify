import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import '../../dist/react-tabs.css';

import MusicAnalysis from './MusicAnalysis.jsx';
import Mood from './Mood.jsx';

class AnalysisTabs extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   tabsArray: [],
    // }
  }

  render() {
    return (
      <Tabs>
        <TabList>
          <Tab >Lyrics Analysis</Tab>
          <Tab >Music Analysis</Tab>
        </TabList>

        <TabPanel>
          <h3>Lyrics Analysis</h3>
          <Mood watson={this.props.watson} songNameAndArtist={this.props.songNameAndArtist} ></Mood>
        </TabPanel>

        <TabPanel>
          <h3>Mood Analysis</h3>
          <MusicAnalysis watson={this.props.watson} songNameAndArtist={this.props.songNameAndArtist} ></MusicAnalysis>
        </TabPanel>
      </Tabs>
    );
  }

};

export default AnalysisTabs;