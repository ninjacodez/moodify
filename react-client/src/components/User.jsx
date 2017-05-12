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
      searchResultsUser: []
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
      this.setState({loggedIn: false})
    })
  }

   componentDidMount () {
    axios.get('/check')
    .then(res => {
      if (res.data.statusCode === 200) {
        this.setState({loggedIn: true})
        this.pastSearch();
      }
    })
  }

  pastSearch() {
    axios.get('/pastSearches')
    .then(res => {
      console.log(res.data);
      this.setState({ searchResultsUser: res.data });
      console.log('Past user searches: ', this.state.searchResultsUser);
    })
    .catch(err => { console.log(err)})
  }

  render() {
     if (this.state.redirect) {
      return <Redirect push to="/loginSignup" />;
    }
    return (
      <div>
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
          runUpDown={this.props.runUpDown} />
        )}
        {renderif (this.props.showPrev) (
        <PastSearchResults 
          results={this.state.searchResultsUser}
          process={this.props.process}
          searchResultsLoading={this.props.searchResultsLoading} />
        )}  
      </div>
    )
  }
}

export default User;
