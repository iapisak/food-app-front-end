import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Search from '../components/Home/Search';

export default ({ restaurants }) => {

    return (
        <Switch>

            <Route exact path='/'
                render={()=> <Search restaurants={ restaurants }/> } />
            
            { restaurants.map(restaurant => {
                return <Route path={`/${ restaurant.restaurant_name }`} key={ restaurant.restaurant_id } 
                        // render={}
            />})}

        </Switch>
    )
}