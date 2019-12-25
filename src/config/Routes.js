import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../components/Home/Home'
import RestaurantContainer from '../components/Container/RestaurantContainer';
import NotFound from '../components/NotFound/NotFound';

export default ({ restaurants }) => {

    return (
        <Switch>

            <Route exact path='/'
                render={()=> <Home key="home" restaurants={ restaurants } /> }/>

            { restaurants.map(data => (
                data.restaurant.map(restaurant => {
                   return <Route path={`/${ restaurant.restaurant_name }`} key={ restaurant.restaurant_id } 
                            render={() =>  <RestaurantContainer 
                                                name={ restaurant.restaurant_name }
                                                id={ restaurant.restaurant_id } 
                                                cuisines={ restaurant.cuisines } 
                                                address={ restaurant.address } 
                                                phone={ restaurant.restaurant_phone } 
                                                hours={ restaurant.hours } 
                                                geo={ restaurant.geo } /> }/>
                })
            ))}

            <Route path='/404'
                render={() => <NotFound /> } />

        </Switch>
    )
}