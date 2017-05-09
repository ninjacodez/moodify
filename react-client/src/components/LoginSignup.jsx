import React from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery";
import { Redirect, Link } from 'react-router-dom';

class LoginSignup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameL: '',
      passwordL: '',
      usernameS: '',
      passwordS: '',
      redirect: false
    };
  }

  usernameChangeL(e) { this.setState({ usernameL: e.target.value }); }
  passwordChangeL(e) { this.setState({ passwordL: e.target.value }); }
  usernameChangeS(e) { this.setState({ usernameS: e.target.value }); }
  passwordChangeS(e) { this.setState({ passwordS: e.target.value }); }

  login(username, password) {
    let loginInfo = { username: username, password: password };
    $.post('/login', loginInfo)
    .done((data) => {
      if (!data.errorMessage) {
        this.setState ({redirect: true})
        console.log('great success!')
      } else if (data.errorMessage) {
        console.log(data.errorMessage);
      }
    };
  }

  signup(username, password) {
    let signupInfo = { username: username, password: password };
    $.post('/signup', signupInfo)
    .done((data) => {
      if (!data.errorMessage) {
        this.setState ({redirect: true})
        console.log('Welcome!')
      } else if (data.errorMessage) {
        console.log(data.errorMessage);
      }
    }
  };

  handleLogin(e) {
    e.preventDefault();
    this.login(this.state.usernameL, this.state.passwordL);
  }

  handleSignup(e) {
    e.preventDefault();
    this.signup(this.state.usernameS, this.state.passwordS);
  }


  render () {
    if (this.state.redirect) {
      return <Redirect push to="/homepage" />;
    }
    return (
      <div>
        <h4> Login/Signup </h4>  
          <input type="text" name="usernameL" value={this.state.usernameL} placeholder="username" onChange={this.usernameChangeL.bind(this)} />
          <input type="text" name="passwordL" value={this.state.passwordL} placeholder="password" onChange={this.passwordChangeL.bind(this)} />
          <button onClick={this.handleLogin.bind(this)}> login! </button> 
          <input type="text" name="usernameS" value={this.state.usernameS} placeholder="username" onChange={this.usernameChangeS.bind(this)} />
          <input type="text" name="passwordS" value={this.state.passwordS} placeholder="password" onChange={this.passwordChangeS.bind(this)} />
          <button onClick={this.handleSignup.bind(this)}> signup! </button> 
      </div>
    )
  }
}

export default LoginSignup;

