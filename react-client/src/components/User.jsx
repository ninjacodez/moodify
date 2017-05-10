import React from 'react';
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

  render() {
     if (this.state.redirect) {
      return <Redirect push to="/loginSignup" />;
    }
    return (
      <div className="user" onClick={this.redirect.bind(this)}>
        Login/Signup!
      </div>)
  }
}

export default User;
