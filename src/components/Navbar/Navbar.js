import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class Navbar extends Component {
    state = {
        postal_code: "",
        restaurant: [],
        photo: "",
        name: "",
        menu: [],
        fetchLoaded: false,
    }

    componentDidMount () {
        axios.get(`${process.env.REACT_APP_API_URL}/restaurant/all`)
        .then((res) => {
            this.setState({ menu: res.data.data })
            this.props.setThisState( this.state.menu )
        })
      }

    handleOnChange = (e) => {
        this.setState({ postal_code: e.target.value })
    }

    createNewRestaurant = () => {
        const newState = {
            postal_code: this.state.postal_code,
            restaurant: this.state.restaurant,
            name: this.state.name,
        }

        axios.put(`${process.env.REACT_APP_API_URL}/restaurant/create`, newState)
        .then(res => {
            console.log(res)
        })
        .catch(err => console.log(err))
    }

    validatedData = () => {
        if (this.state.postal_code.length > 5) {
            this.setState({ postal_code: ''})
            return false

        }
        if (this.state.postal_code[0] === "9" && this.state.postal_code[1] === "5") {
            return true
        } else {
            this.setState({ postal_code: ''})
            return false
        }
    }

    handleOnClick = (zip) => {
        axios.get(`${process.env.REACT_APP_API_URL}/restaurant/${zip}`)
        .then(res => {
            this.setState({ restaurant: res.data.data.restaurant, photo: res.data.data.photo, name: res.data.data.name })
            this.props.setThisState( [ { ...this.state, postal_code: zip } ] )
            this.props.history.push('/');
        })
    }

    searchRestaurant = (e) => {
        e.preventDefault()
        const validatedData = this.validatedData() 
        if (validatedData) {
            axios.get(`${process.env.REACT_APP_API_URL}/restaurant/${this.state.postal_code}`)
            .then(res => {
                console.log('San Jose Area')
                this.setState({ restaurant: res.data.data.restaurant, photo: res.data.data.photo, name: res.data.data.name })
                this.props.setThisState( [ this.state ] )
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
                    console.log('Loaded new data')
                    console.log(res.result.data)
                    this.setState({ restaurant: res.result.data, 
                                    name: res.result.data[0].address.city,
                                    fetchLoaded: !this.state.fetchLoaded  })
                    this.props.setThisState( [ this.state ] )
                    this.createNewRestaurant()
                    this.setState({ postal_code: ''})
                    this.props.history.push('/');
                })
                .catch(err => console.log(err))
            })
        } else {
            console.log('Not San Jose area. Please try again')
        }
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
                                { this.state.menu.map(city => (
                                    <div 
                                        key={ city.postal_code } 
                                        className="dropdown-item">
                                        <span
                                            onClick={()=> { 
                                                const postal_code = city.postal_code; 
                                                this.handleOnClick(postal_code) }
                                            } >
                                            { city.name }
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