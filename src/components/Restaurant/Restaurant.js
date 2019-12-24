import React from 'react';
import { withRouter, Link } from 'react-router-dom';

const Restaurant = (props) => {
    return (
        <div className="col-md-6">
            <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-3 shadow-sm h-md-250 position-relative">
                {/* <div className="col-auto d-none d-lg-block">
                    <svg className="bd-placeholder-img" width="200" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
                </div> */}
                <div className="col p-3 d-flex flex-column position-static">
                    <h5 className="mb-0">
                        <Link to={`/${ props.name }`}>
                            { props.name }
                        </Link>
                    </h5>
                    
                    <p className="card-text mb-auto">{ props.address.formatted }</p>
                    
                    <div className="d-inline-block text-muted">Cuisine : { props.cuisines[0] }</div>
                    <div className="mb-1 text-muted">Phone no. : { props.phone} </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Restaurant)