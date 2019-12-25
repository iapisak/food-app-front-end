import React from 'react';
import { withRouter } from 'react-router-dom';

const NotFound = (props) => {
    return (
        <div>
            <div>
                <p>Your zip code did not match with our data. Please try again.</p>
                <p>We provide service only San Jose area. We have to apologize for you inconvenience</p>
                <button onClick={ props.history.goBack }>Go Back</button>
            </div>
            <img src="https://image.freepik.com/free-vector/404-error-design-with-donut_23-2147739030.jpg" alt="404" />
        </div>
    )
}

export default withRouter(NotFound)