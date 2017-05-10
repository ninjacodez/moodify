import React from 'react';
import ReactDOM from 'react-dom';
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
            <App />
          </Route>
          <Route path='/loginSignup'>
            <LoginSignup />
          </Route>
        </Switch>
      </div>)
  }
}


export default Router;
