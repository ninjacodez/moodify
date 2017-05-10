import React from 'react';
import ReactDOM from 'react-dom';
import Router from './components/Router.jsx';
import pathToRegexp from 'path-to-regexp';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render((
	<BrowserRouter>
	  <Router />
	</BrowserRouter>
	), document.getElementById('root'));
