import React, { Component } from 'react';

class RestaurantContainer extends Component {
    state = {
        restaurant_id: this.props.id,
        restaurant_name: this.props.name,
        result: [],
    }


    getRestaurantData = (e) => {
        fetch(`https://us-restaurant-menus.p.rapidapi.com/${this.state.restaurant_id}/menuitem/`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "us-restaurant-menus.p.rapidapi.com",
                "x-rapidapi-key": "fe0837f0a2msh7cb5dab4b0d98c6p1b7249jsn44b6d3c3edbf"
            }
        })
        .then(stream => stream.json())
        .then(res => {
            console.log(res)
            this.setState({ result: res.result.data })
        })
        .catch(err => {
            console.log(err)
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