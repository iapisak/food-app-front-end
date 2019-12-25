import React from 'react';
import Restaurant from '../Restaurant/Restaurant';

import './Home.css';

const Home = (props) => {
    return (
        props.restaurants.map(data => (
        <div key={ data.postal_code }>
            <div className="jumbotron p-4 p-md-5 text-white rounded" style={{ backgroundImage:`url('${ data.photo}')` }}>
                <div className="col-md-6 px-0">
                    <h1 className="display-4 font-italic">{ data.name } <span className="display-small" > - { data.postal_code }</span> </h1>
                    <p className="lead my-3">Multiple lines of text that form the lede, informing new readers quickly and efficiently about what’s most interesting in this post’s contents.</p>
                </div>
                <p className="font-italic display-small text-right">{ data.restaurant.length } restaurants</p>
            </div>
            <div className="row mb-2">

            { data.restaurant.map(restaurant => (
                <Restaurant key={ restaurant.restaurant_id}
                    name={ restaurant.restaurant_name } 
                    cuisines={ restaurant.cuisines }
                    address= { restaurant.address }
                    phone={ restaurant.restaurant_phone } />
            )) }
            
            </div>
            
        </div>
    ))
    )
}

export default Home