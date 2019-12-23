import React from 'react';

const Restaurant = (props) => {
    return (
        <div>
            <div>{ props.name }</div>
            <div>Cuisine : { props.cuisines[0] }</div>
            <div>Address : { props.address.formatted }</div>
            <div>Phone : { props.phone} </div>
        </div>
    )
}

export default Restaurant