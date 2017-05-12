import React from 'react';
import renderif from 'render-if';
import axios from "axios";
import PastSearches from './PastSearches.jsx';
import { Redirect, Link } from 'react-router-dom';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      loggedIn: false
    };
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
      }
    })
  }

  render() {
     if (this.state.redirect) {
      return <Redirect push to="/loginSignup" />;
    }
    return (
      <div>
        {renderif (!this.state.loggedIn) (
          <div className="user" onClick={this.redirect.bind(this)}>
            Login/Signup!
          </div>
        )}
        <div onClick={this.logout.bind(this)}>
          Logout!
        </div>
        {renderif (this.state.loggedIn) (
          <PastSearches />  
        )}
      </div>
    )
  }
}

export default User;
