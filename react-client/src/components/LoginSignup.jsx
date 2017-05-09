import React from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery";
import { Redirect, Link } from 'react-router-dom';


class Login extends React.Component {
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
    });
  };

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
    if (this.state.redirect) {
      return <Redirect push to="/haro" />;
    }
    return (
      <div>
        <h4> Login/Signup </h4>  
          <input type="text" username="usernameL" value={this.state.usernameL} placeholder="username" onChange={this.usernameChangeL} />
          <input type="text" password="passwordL" value={this.state.passwordL} placeholder="password" onChange={this.passwordChangeL} />
          <button onClick={this.handleLogin.bind(this)}> login! </button> 
          <input type="text" username="usernameS" value={this.state.usernameS} placeholder="username" onChange={this.usernameChangeS} />
          <input type="text" password="passwordS" value={this.state.passwordS} placeholder="password" onChange={this.passwordChangeS} />
          <button onClick={this.handleSignup.bind(this)}> signup! </button> 
      </div>
    )
  }
}

          // <div> <Link to={`/haro`} > Front of App </Link></div> 
export default Login;