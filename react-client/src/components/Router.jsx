import React from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery";
import LoginSignup from './LoginSignup.jsx';
import App from './App.jsx';
import { Switch, Route, Link } from 'react-router-dom';

class Router extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render () {
    return (
      <div>   
       <Switch>
          <Route exact path='/' >
            <LoginSignup />
          </Route>
          <Route path='/haro'>
            <App />
          </Route>   
        </Switch>
      </div>)
  }
}


export default Router;
