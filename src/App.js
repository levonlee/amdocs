import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from "./components/Router";

import './App.css';
class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      toggleLogo: true,
      cards: [],
    }
  }

  render() {
    return (
      <BrowserRouter>
          <Router />
      </BrowserRouter>
    );
  }

}

export default App;
