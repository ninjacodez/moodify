import React from 'react';
import renderif from 'render-if';
import axios from "axios";
import PastSearches from './PastSearches.jsx';
import PastSearchResults from './PastSearchResults.jsx';
import { Redirect, Link } from 'react-router-dom';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      loggedIn: false,
      pastSearchResults: [],
      loading: false
    };
    this.logout = this.logout.bind(this);
    this.redirect = this.redirect.bind(this);
    this.pastSearch = this.pastSearch.bind(this);
  }

  redirect () {
    this.setState ({
      redirect: true
    })
  }

  logout () {
    axios.get('/logout')
    .then(res => {
      console.log(res.data)
      this.setState({loggedIn: false, pastSearchResults: []})
    })
  }

  componentDidMount () {
    axios.get('/check')
    .then(res => {
      if (res.data.statusCode === 200) {
        this.setState({loggedIn: true})
<<<<<<< HEAD
        this.props.showPrev();
=======
        // this.pastSearch();
>>>>>>> impletemnt onClick functionality: now fetching past song data from database and display on screen
      }
    })
  }

  pastSearch() {
    this.setState({
      loading: true
    })
    axios.get('/pastSearches')
    .then(res => {
<<<<<<< HEAD
      this.setState({ pastSearchResults: res.data, loading: false });
=======
      this.setState({ pastSearchResults: res.data });
>>>>>>> impletemnt onClick functionality: now fetching past song data from database and display on screen
    })
    .catch(err => { console.log(err)})
  }

  render() {
     if (this.state.redirect) {
      return <Redirect push to="/loginSignup" />;
    }
    return (
      <div className="allUser">
      <div className="user">
        {renderif (!this.state.loggedIn) (
          <div className="loginButton" onClick={this.redirect}>
            Login/Signup!
          </div>
        )}
        {renderif (this.state.loggedIn) (
          <div className="loginButton" onClick={this.logout}>
          Logout!
        </div>
        )}
        {renderif (this.state.loggedIn) (
        <PastSearches search={this.props.search}
          prev={this.props.prev}
          upDown={this.props.upDown}
          runUpDown={this.props.runUpDown}
          pastSearch={this.pastSearch}/>
        )}
      </div>
      <div>
      <br />
        {renderif (this.props.showPrev) (
        <PastSearchResults
          results={this.state.pastSearchResults}
<<<<<<< HEAD
          loading={this.state.loading}
=======
          searchResultsLoading={this.props.searchResultsLoading}
>>>>>>> impletemnt onClick functionality: now fetching past song data from database and display on screen
          loadPastSearchResults={this.props.loadPastSearchResults} />
        )}
      </div>
    </div>
    )
  }
}

export default User;
