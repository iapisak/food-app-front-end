import React from 'react';
import { withRouter } from 'react-router-dom';

const NotFound = (props) => {
    return (
        <div>
            <div>
                <p>We have to apologize for you inconvenience. We dont have service in this area. Please try again</p>
                <button onClick={ props.history.goBack }>Go Back</button>
            </div>
            <img src="https://image.freepik.com/free-vector/404-error-design-with-donut_23-2147739030.jpg" alt="404" />
        </div>
    )
}

export default withRouter(NotFound)