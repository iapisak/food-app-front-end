import React, { Component } from 'react';
import axios from 'axios';
import Menu from '../Menu/Menu';

class RestaurantContainer extends Component {
    state = {
        restaurant_id: this.props.id,
        name: this.props.name,
        menu: [],
    }

    createNewMenu = () => {
        axios.put(`${process.env.REACT_APP_API_URL}/menu/create`, this.state)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    componentDidMount () {
        axios.get(`${process.env.REACT_APP_API_URL}/menu/${this.props.id}`)
        .then(res => {
            this.setState({ menu: res.data.data.menu })
        })
        .catch(() => {
            fetch(`https://us-restaurant-menus.p.rapidapi.com/restaurant/${this.props.id}/menuitems?page=1`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "us-restaurant-menus.p.rapidapi.com",
                    "x-rapidapi-key": "fe0837f0a2msh7cb5dab4b0d98c6p1b7249jsn44b6d3c3edbf"
                }
            })
            .then(stream => stream.json())
            .then(res => {
                this.setState({ menu: res.result.data })
                this.createNewMenu()
            })
            .catch(err => {
                console.log(err)
            })
        })
    }

    render() {
        return (
            <>
            <div className="jumbotron p-4 p-md-5 text-white rounded bg-dark">
                <div>
                    <h1 className="display-4 font-italic">{ this.props.name }</h1>
                </div>
                <div className="d-flex">
                    <div className="col-md-7 px-0">
                        <h5 className="font-italic">{ this.props.address.formatted }</h5>
                        <h5 className="font-italic">Phone number : { this.props.phone }</h5>
                        <div className="d-flex">
                        { this.props.cuisines.map(item => (
                            <p key={ item } className="lead font-italic">{ item }</p>
                        ))}
                        <span className="lead font-italic text-info">...edit...</span>
                        </div>
                        <button>Write a review</button>
                        <button>Add photo</button>
                    </div>
                    <div>
                        <h5 className="font-italic">Business Hours</h5>
                        <div>{ this.props.hours }</div>
                        <button>Edit business hours</button>
                    </div>
                </div>
            </div>
            <h3>Our Menu</h3>
            <div>
            { this.state.menu.map(items => (
              <Menu
                key={ items.item_id }
                name={ items.menu_item_name }
                menu_description={ items.menu_item_description }
                description= { items.subsection_description }
                type={ items.subsection }
                price={ items.menu_item_pricing }
              />              
            ))}
            </div>
            <form>
                <div className="custom-file">
                    <input type="file" className="custom-file-input" id="validatedCustomFile" required />
                    <label className="custom-file-label" htmlFor="validatedCustomFile">Choose file...</label>
                </div>
                <div className="form-group">
                    <label htmlFor="commentInput">Comment</label>
                    <input type="text" className="form-control" id="commentInput" placeholder="Share your comments" />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary" type="submit">Submit form</button>
                </div>
            </form>
            </>
        )
    }
}

export default RestaurantContainer