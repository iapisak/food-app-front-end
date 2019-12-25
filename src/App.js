import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import axios from 'axios';
import Navbar from './components/Navbar/Navbar';
import Routes from './config/Routes';

import './App.css';

class App extends Component {
    state = {
      restaurants: [],
      fetchLoad: false,
    }

    setThisState = (restaurant) => {
      this.setState({ restaurants:  restaurant  })
    }

    // componentDidMount () {
    //   axios.get(`${process.env.REACT_APP_API_URL}/restaurant/all`)
    //   .then((res) => {
    //       this.setState({ restaurants: res.data.data})
    //   })
    // }

    render() {
      return (
        <>
          <Navbar 
            setThisState={ this.setThisState } 
            menu={ this.state.restaurants } />
          <main className="container">
            <Routes 
              restaurants={ this.state.restaurants } />
          </main>
        </>
      )
    }
}

export default withRouter(App);
