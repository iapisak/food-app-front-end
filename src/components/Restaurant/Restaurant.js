import React from 'react';

const Restaurant = (props) => {
    return (
        <div>
            <div>{ props.name }</div>
            <div>{ props.address }</div>
        </div>
    )
}

export default Restaurant