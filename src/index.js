import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { BrowserRouter as Router } from "react-router-dom";
import { App } from "./container/App";
import * as serviceWorker from './serviceWorker';

// setup fake backend - CLF TODO - put in config to turn on and off
// CLF IMPORTANT TODO - comment out these two lines to turn off fake backend
import { configureFakeBackend } from './_helpers';
configureFakeBackend();

// CLF - In public there is a config.js file that contains information that can change from installation to installation.  For example the endpoint for the Web API
window.RenderApp = (config) => {
  ReactDOM.render(
    <Router>
      <App _config={config}/>
    </Router>,
    document.getElementById("root")
  );
}

// unregister() to register() below. 
serviceWorker.unregister();