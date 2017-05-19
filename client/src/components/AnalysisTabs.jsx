import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import '../../dist/react-tabs.css';

import Moodifier from './Moodifier.jsx';
import LyricsAnalysis from './LyricsAnalysis.jsx';

class AnalysisTabs extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log('Props in AnalysisTabs === ', this.props)
    return (
      <Tabs>
        <TabList>
          <Tab >Music Analysis</Tab>
          <Tab >Lyrics Analysis</Tab>
        </TabList>
        <TabPanel>
          <Moodifier
            spotifyURI={this.props.spotifyURI}
            watson={this.props.watson}
            songNameAndArtist={this.props.songNameAndArtist}
            spotifyAnalysis={this.props.spotifyAnalysis} >
          </Moodifier>
        </TabPanel>
        <TabPanel>
          <LyricsAnalysis
            watson={this.props.watson}
            songNameAndArtist={this.props.songNameAndArtist} >
          </LyricsAnalysis>
        </TabPanel>
      </Tabs>
    );
  }

};

export default AnalysisTabs;