import React, { Component } from 'react';
import axios from 'axios';

class RestaurantContainer extends Component {
    state = {
        restaurant_id: this.props.id,
        name: this.props.name,
        menu: [],
    }

    createNewMenu = () => {
        axios.put(`${process.env.REACT_APP_API_URL}/menu/create`, this.state)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    componentDidMount () {
        axios.get(`${process.env.REACT_APP_API_URL}/menu/${this.state.restaurant_id}`)
        .then(res => {
            this.setState({ menu: res.data.data.menu })
        })
        .catch(() => {
            fetch(`https://us-restaurant-menus.p.rapidapi.com/restaurant/${this.state.restaurant_id}/menuitems?page=1`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "us-restaurant-menus.p.rapidapi.com",
                    "x-rapidapi-key": "fe0837f0a2msh7cb5dab4b0d98c6p1b7249jsn44b6d3c3edbf"
                }
            })
            .then(stream => stream.json())
            .then(res => {
                this.setState({ menu: res.result.data })
                this.createNewMenu()
            })
            .catch(err => {
                console.log(err)
            })
        })
    }

    render() {
        return (
            <>
            <h3>{ this.props.name }</h3>
            <h4>{ this.props.id }</h4>
            </>
        )
    }
}

export default RestaurantContainer