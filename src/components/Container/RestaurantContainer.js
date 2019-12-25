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
        axios.get(`${process.env.REACT_APP_API_URL}/menu/${this.state.restaurant_id}`)
        .then(res => {
            this.setState({ menu: res.data.data.menu })
        })
        .catch(() => {
            fetch(`https://us-restaurant-menus.p.rapidapi.com/restaurant/${this.state.restaurant_id}/menuitems?page=1`, {
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
                <div className="col-md-6 px-0">
                    <h1 className="display-4 font-italic">{ this.props.name }</h1>
                    <p className="lead my-3">Multiple lines of text that form the lede, informing new readers quickly and efficiently about what’s most interesting in this post’s contents.</p>
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
                    <label className="custom-file-label" for="validatedCustomFile">Choose file...</label>
                </div>
                <div className="form-group">
                    <label for="commentInput">Comment</label>
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