import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

// import mood component (lyrics analysis)
// import songMood component (song analysis)

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
          <Mood ></Mood>
        </TabPanel>

        <TabPanel>
          <h3>Mood Analysis</h3>
          <SongAnalysis ></SongAnalysis>
        </TabPanel>
      </Tabs>
    );
  }

};