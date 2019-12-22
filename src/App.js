import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar'

import './App.css';


class App extends Component {
    state = {
      currentUser: localStorage.getItem('uid'),
      restarant: [],
    }

    setThisState = (restaurant) => {
      this.setState({ restaurant })
    }

    render() {
      return (
        <>
          <Navbar 
            setThisState={ this.setThisState }
          />
          <h1>Hello</h1>
        </>
      )
    }
}

export default App;
