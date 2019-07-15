import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import userService from '../../utils/userService.js';
import showItemsService from '../../utils/showItemsService.js';
import axios from 'axios';

class ShowItemsForm extends Component {

  state = {
    user: '',
    lent_items: ["Hat"],
    borrowed_items: [],
  };

  async grabUser() {
    const user =  await userService.getUser()._id; 
    this.setState({user: user});
  }

  handleChange = (e) => {
    console.log("UPDATED");
    console.log(e);
    this.props.updateMessage('');
    this.setState({
      // Using ES2015 Computed Property Names
      //[e.target.name]: e.target.value
    }, function() {
      console.log(this.state);
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    try {
      // find out which button was pressed
      let returnedWhat = e.returned_what; // this will probably need work
      await showItemsService.returned(returnedWhat);
      // Let <App> know a user has signed up!
      this.props.handleShowItems();
      // Successfully signed up - show GamePage
      this.props.history.push('/');
    } catch (err) {
      // Invalid user data (probably duplicate email)
      this.props.updateMessage(err.message);
    }
  }


  render() {
    return (
      <div>
        <header className="header-footer">Lend or Borrow</header>
        <form className="form-horizontal" onSubmit={this.handleSubmit} >
          {/* <div className="form-group">
            <div className="col-sm-12">
              <input type="text" className="form-control" placeholder="User" value={userService.getUser()._id} name="user" readOnly disabled />
            </div>
          </div> */}

          
          {/* <div className="form-group">
            <div className="col-sm-12">
              {this.state.lent_items}
              <button className="btn btn-default" name="returned_what" value={this.state.lent_items[0]} >Returned</button>&nbsp;&nbsp;
            </div>
          </div> */}
        </form>
      </div>
    );
  }
}

export default ShowItemsForm;