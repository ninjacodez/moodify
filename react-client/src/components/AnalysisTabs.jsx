import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

// import mood component (lyrics analysis)
// import songMood component (song analysis)

import SongAnalysis from './SongAnalysis';
import Mood from './Mood';

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
          <Tab className="tab-text">Lyrics Analysis</Tab>
          <Tab className="tab-text">Mood Analysis</Tab>
        </TabList>

        <TabPanel>
          <h3>Lyrics Analysis</h3>
          <Mood watson={this.props.watson} songNameAndArtist={this.props.currentSongNameAndArtist} ></Mood>
        </TabPanel>

        <TabPanel>
          <h3>Mood Analysis</h3>
          <MusicAnalysis ></MusicAnalysis>
        </TabPanel>
      </Tabs>
    );
  }

};