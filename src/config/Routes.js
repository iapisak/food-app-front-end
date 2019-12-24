import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../components/Home/Home'
import RestaurantContainer from '../components/Container/RestaurantContainer';

export default ({ restaurants }) => {

    return (
        <Switch>

            <Route exact path='/'
                render={()=> <Home restaurants={ restaurants } /> }/>

            { restaurants.map(data => (
                data.result.map(restaurant => {
                   return <Route path={`/${ restaurant.restaurant_name }`} key={ restaurant.restaurant_id } 
                            render={() =>  <RestaurantContainer 
                                                name={ restaurant.restaurant_name }
                                                id={ restaurant.restaurant_id } /> }/>
                })
            ))}

        </Switch>
    )
}