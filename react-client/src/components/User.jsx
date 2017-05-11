import React from 'react';
import axios from "axios";
import PastSearches from './PastSearches.jsx';
import { Redirect, Link } from 'react-router-dom';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
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
    })
  }

  render() {
     if (this.state.redirect) {
      return <Redirect push to="/loginSignup" />;
    }
    return (
      <div>
        <div className="user" onClick={this.redirect.bind(this)}>
          Login/Signup!
        </div>
        <div onClick={this.logout.bind(this)}>
          Logout!
        </div>
        <PastSearches />  
      </div>
    )
  }
}

export default User;
