import React from 'react';

const Menu = (props) => {
    return (
        <>
            <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-3 shadow-sm h-md-250 position-relative">
                <div className="col-auto d-none d-lg-block">
                    <svg className="bd-placeholder-img" width="400" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect>
                    {/* <text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text> */}
                    </svg>
                </div>
                <div className="col p-3 d-flex flex-column position-static">
                    <h3 className="mb-3">{ props.name }</h3>
                    
                    <p className="card-text mb-2">{ props.menu_description } <span className="text-info"> Recomment...</span></p>
                    <p className="card-text mb-2">Choice: { props.description }</p>
                    <div className="d-inline-block text-muted">Type: { props.type }</div>
                    {/* { props.price[0] && <p>Price: { props.price[0].priceString }</p> } */}
                    { props.price.length <=0 ? 
                        <p className="mb-1 text-muted">Price: </p> 
                    : 
                        <p className="mb-1 text-muted">Price: { props.price[0].priceString }</p> }
                </div>
                <div>
                    <button className="btn btn-info">Add order</button>
                </div>
            </div>
        </>
    )
}

export default Menu;