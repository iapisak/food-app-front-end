import React, { Component } from 'react';

class RestaurantContainer extends Component {

    render() {
        return (
            <h3>{ this.props.name }</h3>
        )
    }
}

export default RestaurantContainer