import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Routes from './config/Routes';

import './App.css';

class App extends Component {
    state = {
      restaurants: [],
    }

    setThisState = (restaurant) => {
      this.setState({ restaurants: restaurant })
    }

    render() {
      return (
        <>
          <Navbar 
            setThisState={ this.setThisState } />
          <main>
            <Routes 
              restaurants={ this.state.restaurants } />
          </main>
        </>
      )
    }
}

export default withRouter(App);
