import React, { Component } from 'react';
import Restaurant from '../Restaurant/Restaurant';

class Home extends Component {

    render () {
        return (
            <>
                { this.props.restaurants.map(restaurant => (
                    <Restaurant 
                        name={ restaurant.restaurant_name } 
                        address= { restaurant.address }
                        />
                ))}
                
            </>
        )
    }
}

export default Home