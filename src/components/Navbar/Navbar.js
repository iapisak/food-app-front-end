import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class Navbar extends Component {
    state = {
        postal_code: "",
        result: [],
    }

    handleOnChange = (e) => {
        this.setState({ postal_code: e.target.value })
    }

    createNewRestaurant = () => {
        axios.put(`${process.env.REACT_APP_API_URL}/restaurant/create`, this.state)
        .then(res => {
            console.log(res)
        })
        .catch(err => console.log(err))
    }

    searchRestaurant = (e) => {
        e.preventDefault()
        if (this.state.postal_code[0] === "9" && this.state.postal_code[1] === "5") {
            console.log('San Jose Area')
            axios.get(`${process.env.REACT_APP_API_URL}/restaurant/${this.state.postal_code}`)
            .then(res => {
                this.setState({ result: res.data.data.result })
                this.props.setThisState( this.state )
                this.setState({ postal_code: ''})
                this.props.history.push('/');
            })
            .catch(() => {
                fetch(`https://us-restaurant-menus.p.rapidapi.com/restaurants/zip_code/${this.state.postal_code}?page=1`, {
                    method: "GET",
                    headers: {
                        "x-rapidapi-host": "us-restaurant-menus.p.rapidapi.com",
                        "x-rapidapi-key": "fe0837f0a2msh7cb5dab4b0d98c6p1b7249jsn44b6d3c3edbf"
                    },
                })
                .then(stream => stream.json())
                .then(res => {
                    this.setState({ result: res.result.data })
                    this.props.setThisState( this.state )
                    this.createNewRestaurant()
                    this.setState({ postal_code: ''})
                    this.props.history.push('/');
                })
                .catch(err => {
                    console.log(err)
                })
            })
        } else {
            console.log('Not San Jose area. Please try again')
        }
    }

    render() {
        return (
        <div className="container">
            <a className="navbar-brand" href="/"><h1>Logo here</h1></a>
            <nav className="navbar navbar-expand-xl navbar-dark bg-dark">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample06" aria-controls="navbarsExample06" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarsExample06">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">Catagory</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/" id="dropdown06" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                            <div className="dropdown-menu" aria-labelledby="dropdown06">
                                <a className="dropdown-item" href="/">Action</a>
                                <a className="dropdown-item" href="/">Another action</a>
                                <a className="dropdown-item" href="/">Something else here</a>
                            </div>
                        </li>
                    </ul>
                    <form onSubmit={ this.searchRestaurant } className="form-inline my-2 my-md-0">
                        <input onChange={ this.handleOnChange } className="form-control" type="text" placeholder="Search" value={ this.state.postal_code } />
                    </form>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/">Cart</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">Log in / Sign up</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        )
    }
}

export default withRouter(Navbar);