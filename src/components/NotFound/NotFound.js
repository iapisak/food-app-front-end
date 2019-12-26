import React from 'react';
import { withRouter } from 'react-router-dom';
import api from '../Navbar/cities.json';

const NotFound = (props) => {

    return (
        <div>
            <div>
                <p>We have to apologize for you inconvenience. We dont have service in this area. Please try with data provided in below.</p>
                <h6>
                { api.map(item => (
                    <span key={ item.data.postal_code }>{ item.data.name } ( { item.data.postal_code} ) , </span>
                ))}
                </h6>
                <button onClick={ props.history.goBack }>Go Back</button>
            </div>
            <img src="https://image.freepik.com/free-vector/404-error-design-with-donut_23-2147739030.jpg" alt="404" />
        </div>
    )
}

export default withRouter(NotFound)