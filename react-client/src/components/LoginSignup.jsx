import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.jsx';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

class LoginSignup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameL: '',
      passwordL: '',
      usernameS: '',
      passwordS: '',
      redirect: false,
      userError: '',
      signError: ''
    };
  }

  usernameChangeL(e) { this.setState({ usernameL: e.target.value }); }
  passwordChangeL(e) { this.setState({ passwordL: e.target.value }); }
  usernameChangeS(e) { this.setState({ usernameS: e.target.value }); }
  passwordChangeS(e) { this.setState({ passwordS: e.target.value }); }

  login(username, password) {
    let loginInfo = { username: username, password: password };
    axios.post('/login', loginInfo)
    .then((res) => {
      if (!res.data.errorMessage) {
        this.setState ({redirect: true})
        console.log('Login successful!')
      } else if (res.data.errorMessage) {
        this.setState({userError: res.data.errorMessage});
      }
    });
  };

  signup(username, password) {
    let signupInfo = { username: username, password: password };
    axios.post('/signup', signupInfo)
    .then((res) => {
      if (!res.data.errorMessage) {
        this.setState ({redirect: true})
        console.log('Welcome!')
      } else if (res.data.errorMessage) {
        this.setState({signError: res.data.errorMessage});
      }
    });
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
      return <Redirect push to="/" />;
    }
    return (
      <div>
      <Header />
      <div className="forms">
        <div className="loginForm">
        Have an account?
        <br />
          <input type="text" className="inputText" name="usernameL" value={this.state.usernameL} placeholder="username" onChange={this.usernameChangeL.bind(this)} />
          <br />
          <input type="password" className="inputText" name="passwordL" value={this.state.passwordL} placeholder="password" onChange={this.passwordChangeL.bind(this)} />
          <br />
          <button onClick={this.handleLogin.bind(this)} className="loginButton"> Login </button>
          <br />
          {this.state.userError.length > 0 ?
          <div className="errorMessage">{this.state.userError}</div>
          : null}
        </div>
        <div className="signupForm">
        Need to sign up?
        <br />
          <input type="text" className="inputText" name="usernameS" value={this.state.usernameS} placeholder="username" onChange={this.usernameChangeS.bind(this)} />
          <br />
          <input type="password" className="inputText" name="passwordS" value={this.state.passwordS} placeholder="password" onChange={this.passwordChangeS.bind(this)} />
          <br />
          <button onClick={this.handleSignup.bind(this)} className="loginButton"> Signup </button>
          <br />
          {this.state.signError.length > 0 ?
          <div className="errorMessage">{this.state.signError}</div>
          : null}
        </div>
      </div></div>
    )
  }
}

export default LoginSignup;
