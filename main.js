import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';
// require("bootstrap");
// import './bootstrap/dist/css/bootstrap.min.css';  

// window.jQuery = window.$ =  require("jquery");
// window.moment = require('moment');
window._ = require('lodash');

import 'core-js/es6/array'
import 'core-js/es6/promise'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'core-js/es6/object'

// import 'jquery-ui-npm/jquery-ui.min.js'

// require("bootstrap");

require.ensure([], () => {
  require('./app');
})


ReactDOM.render(<App />, document.getElementById('app'));  