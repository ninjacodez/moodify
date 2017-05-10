import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import Router from './components/Router.jsx';
import pathToRegexp from 'path-to-regexp';
import { BrowserRouter } from 'react-router-dom';
import LoginSignup from './components/LoginSignup.jsx';

ReactDOM.render((
	<BrowserRouter>
	  <Router />
	</BrowserRouter>
	), document.getElementById('root'));
