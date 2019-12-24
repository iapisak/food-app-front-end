import React from 'react';
import { withRouter, Link } from 'react-router-dom';

const Restaurant = (props) => {
    return (
        <div>
            <div>
                <Link to={`/${ props.name }`}>
                    { props.name }
                </Link>
            </div>
            <div>Cuisine : { props.cuisines[0] }</div>
            <div>Address : { props.address.formatted }</div>
            <div>Phone : { props.phone} </div>
        </div>
    )
}

export default withRouter(Restaurant)