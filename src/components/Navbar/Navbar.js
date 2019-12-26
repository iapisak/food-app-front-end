import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import api from './cities.json'

class Navbar extends Component {
    state = {
        postal_code: "",
        restaurant: [],
        photo: "",
        name: "",
        city: api,
    }

    handleOnChange = (e) => {
        this.setState({ postal_code: e.target.value })
    }

    createNewRestaurant = () => {
        const newState = {
            photo: this.state.photo,
            postal_code: this.state.postal_code,
            restaurant: this.state.restaurant,
            name: this.state.name,
        }

        axios.put(`${process.env.REACT_APP_API_URL}/restaurant/create`, newState)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    validatedData = () => {
        if (this.state.postal_code.length > 5) {
            this.setState({ postal_code: ''})
            return false
        }

        const postal_code = this.state.postal_code
        const foundPostalCode = this.state.city.find(element => {
            return element.data.postal_code === postal_code
        })

        if (foundPostalCode) {
            this.setState({ photo: foundPostalCode.data.image, 
                            name: foundPostalCode.data.name })
            return true
        } else {
            this.setState({ postal_code: '',
                            photo: '',
                            name: '' })
            return false
        }
    }

    fetchLoaded = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/restaurant/${this.state.postal_code}`)
        .then(res => {
            this.setState({ restaurant: res.data.data.restaurant, photo: res.data.data.photo, name: res.data.data.name })
            this.props.setThisState( [ this.state ] )
            this.setState({ postal_code: '',
                            photo: '',
                            name: '', 
                            restaurant: [], })
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
                this.setState({ restaurant: res.result.data })
                this.props.setThisState( [ this.state ] )
                this.createNewRestaurant()
                this.setState({ postal_code: '',
                                photo: '',
                                name: '', 
                                restaurant: [], })
                this.props.history.push('/');
            })
            .catch(err => console.log(err))
        }) 
    }

    searchRestaurant = (e) => {
        e.preventDefault()
        const validatedData = this.validatedData() 
        if (validatedData) {
            this.fetchLoaded()
        } else {
            this.props.history.push("/404")
        }
    }


    handleOnClick = async (zip) => {
        const foundPostalCode = await this.state.city.find(element => {
            return element.data.postal_code === zip
        })
        this.setState({ postal_code: foundPostalCode.data.postal_code,
                        photo: foundPostalCode.data.image,
                        name: foundPostalCode.data.name, })
        this.fetchLoaded()
    }

    render() {
        return (
        <div className="container">
            <h1>Delivery.com</h1>
            <nav className="navbar navbar-expand-xl navbar-dark bg-dark">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample06" aria-controls="navbarsExample06" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarsExample06">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/" id="dropdown06" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Catagory</a>
                            <div className="dropdown-menu" aria-labelledby="dropdown06">
                                { this.state.city.map(city => (
                                    <div
                                        key={ city.data.postal_code } 
                                        className="dropdown-item">
                                        <span 
                                            onClick={()=> {
                                                const zip_code = city.data.postal_code
                                                this.handleOnClick(zip_code) }} >
                                            { city.data.name }
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </li>
                    </ul>
                    <div className="text-white" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="mx-3" role="img" viewBox="0 0 24 24" focusable="false"><title>Search</title><circle cx="10.5" cy="10.5" r="7.5"></circle><path d="M21 21l-5.2-5.2"></path></svg>
                    </div>
                    <form onSubmit={ this.searchRestaurant } className="form-inline my-2 my-md-0">
                        <input onChange={ this.handleOnChange } className="form-control" type="text" placeholder="Search by zip code" value={ this.state.postal_code } />
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