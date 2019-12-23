import React, { Component } from 'react';
import Restaurant from '../Restaurant/Restaurant';

class Search extends Component {

    render () {
        return (
            <>
                { this.props.restaurants.map(restaurant => (
                    <Restaurant key={ restaurant.restaurant_id}
                        name={ restaurant.restaurant_name } 
                        cuisines={ restaurant.cuisines }
                        address= { restaurant.address }
                        phone={ restaurant.restaurant_phone }
                        />
                ))}
            </>
        )
    }
}

export default Search