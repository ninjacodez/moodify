import React from 'react';
import ReactDOM from 'react-dom';
import LoginSignup from './components/LoginSignup.jsx';
import App from './components/App.jsx';
import Router from './components/Router.jsx';
import LoginSignup from './components/LoginSignup.jsx';
import pathToRegexp from 'path-to-regexp';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render((
	<BrowserRouter>
	  <Router />
	</BrowserRouter>
	), document.getElementById('root'));
