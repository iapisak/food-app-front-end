import React from 'react';
import Restaurant from '../Restaurant/Restaurant';

const Home = (props) => {
    return (
        props.restaurants.map(data => (
        <>
            <div>{ data.postal_code }</div>
            <div className="row mb-2">

            { data.result.map(restaurant => (
                <Restaurant key={ restaurant.restaurant_id}
                    name={ restaurant.restaurant_name } 
                    cuisines={ restaurant.cuisines }
                    address= { restaurant.address }
                    phone={ restaurant.restaurant_phone } />
            )) }
            
            </div>

        </>
    ))
    )
}

export default Home