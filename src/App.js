import React from 'react';
import Router from './router/index.js';
import {
  Provider
} from "mobx-react";
import stores from './store/index'
import './assets/styles/common.less'

function App() {

  return ( <Provider {...stores } >
    <Router > </Router> 
    </Provider>
  );
}

export default App;