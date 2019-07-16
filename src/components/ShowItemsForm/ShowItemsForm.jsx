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

  //helper method to update item
  editItem = () => {

  }

  //this deletes the items
  delete = () => {

  }

  render() {
    return (
      <div>
        <p>{this.props.name}</p>
        <p>{this.props.person}</p>
        <button onClick={this.delete}>delete</button>
        <button onClick={this.editItem}>edit item</button>
      </div>
    );
  }
} 

export default ShowItemsForm;