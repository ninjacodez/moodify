import React from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery";


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  usernameChange(e) { this.setState({ username: e.target.value }); }
  passwordChange(e) { this.setState({ password: e.target.value }); }

  login(username, password) {
    let loginInfo = { username: username, password: password };
    $.post('/', loginInfo)
    .done((data) => {
      console.log('great success!')
    });
  };

  signup(username, password) {
    let signupInfo = { username: username, password: password };
    $.post('/', signupInfo)
    .done((data) => {
      console.log('Welcome!')
    });
  };

  handleLogin(e) {
    e.preventDefault();
    this.login(this.state.username, this.state.password);
  }

   handleSignup(e) {
    e.preventDefault();
    this.signup(this.state.username, this.state.password);
  }


  render () {
    return (
      <div>
        <h4> Login/Signup </h4>  
          <input type="text" username="username" value={this.state.username} placeholder="username" onChange={this.usernameChange} />
          <input type="text" password="password" value={this.state.password} placeholder="password" onChange={this.passwordChange} />
          <button onClick={this.handleLogin.bind(this)}> login! </button> 
          <button onClick={this.handleSignup.bind(this)}> signup! </button> 
      </div>
    )
  }
}

export default Login;