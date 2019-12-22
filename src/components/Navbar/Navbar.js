import React, { Component } from 'react';

class Navbar extends Component {
    render() {
        return (
        <>
            <a className="navbar-brand" href="/"><h1>Logo here</h1></a>
            <nav className="navbar navbar-expand-xl navbar-dark bg-dark">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample06" aria-controls="navbarsExample06" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarsExample06">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">All Restaurant <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">Catagory</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/" id="dropdown06" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                            <div className="dropdown-menu" aria-labelledby="dropdown06">
                                <a className="dropdown-item" href="/">Action</a>
                                <a className="dropdown-item" href="/">Another action</a>
                                <a className="dropdown-item" href="/">Something else here</a>
                            </div>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-md-0">
                        <input className="form-control" type="text" placeholder="Search" />
                    </form>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/">Cart</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">Log in / Sign up</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
        )
    }
}

export default Navbar