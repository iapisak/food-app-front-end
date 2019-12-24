import React from 'react';

const Menu = (props) => {
    return (
        <div>
            <div>{ props.name }</div>
            <div>Detail: { props.menu_description }</div>
            <div>Choice: { props.description }</div>
            <div>Type: { props.type }</div>
            { props.price[0] && <p>Price: { props.price[0].priceString }</p> }
            {/* { props.price.length <=0 ? <p>Price: </p> : <p>Price: { props.price[0].priceString }</p> } */}
        </div>
    )
}

export default Menu;