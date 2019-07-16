import React, { Component } from "react";
import { Link } from "react-router-dom";
import userService from "../../utils/userService.js";
import showItemsService from "../../utils/showItemsService.js";
import axios from "axios";
import itemService from "../../utils/itemService.js";
import tokenService from "../../utils/tokenService";

class ShowItemsForm extends Component {
  state = {
    user: "",
    lent_items: ["Hat"],
    borrowed_items: [],
    editForm: true,
    delete: false,
    
  };

  componentDidMount() {
    this.setState( this.props.object )
  }

  async grabUser() {
    const user = await userService.getUser()._id;
    this.setState({ user: user });
  }

  handleChange = e => {
    console.log("UPDATED");
    console.log(e);
    this.props.updateMessage("");
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      function() {
        console.log(this.state);
      }
    );
  };

  cancelEdit = e => {
    e.preventDefault();
    this.setState({editForm: false})
  }

  sendEdit = async e => {
    e.preventDefault();
    // await showItemsService.editItem(this.state);
    this.setState({editForm:!this.state.editForm})
    this.props.handleLendOrBorrow();
  }

  handleSubmit = async e => {
    e.preventDefault();
    console.log(e);
    try {
      // find out which button was pressed
      let returnedWhat = e.returned_what; // this will probably need work
      await showItemsService.returned(returnedWhat);
      // Let <App> know a user has signed up!
      this.props.handleShowItems();
      // Successfully signed up - show GamePage
      this.props.history.push("/");
    this.props.handleLendOrBorrow();

    } catch (err) {
      // Invalid user data (probably duplicate email)
      this.props.updateMessage(err.message);
    }
  };

  //helper method to update item
  editItem = () => {
    this.setState({ editForm: !this.state.editForm });
  };

  //this deletes the items
  delete = () => {

    // showItemsService.deleteItem(this.props.id); //deletes the item
    fetch('/api/items/' + this.props.id,{
      method: 'DELETE',
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": "Bearer " + tokenService.getToken()
      })
    }).then(res => {
      this.setState({delete: !this.state.delete});
      return this.props.handleLendOrBorrow(); 
    }).
    catch(err => console.log(err));
    
    this.props.handleLendOrBorrow();
  }
    

  render() {
    return (
      <div>
        
        {this.state.editForm ? 
          <div>
            <p>{this.state.name}</p>
            <p>{this.state.person}</p>
            <button onClick={this.delete}>delete</button>
            <button onClick={this.editItem}>edit item</button>
          </div>
       
        :
        <div>
          <input
          type="input"
          onChange={this.handleChange}
          value={this.state.name}
          name="name"
          placeholder="name"
        />
        <input
          type="input"
          onChange={this.handleChange}
          value={this.state.person}
          name="person"
          placeholder="person"
        />
        <input
          type="input"
          onChange={this.handleChange}
          value={this.state.color}
          name="color"
          placeholder="color"
        />
        <input
          type="input"
          onChange={this.handleChange}
          value={this.state.size}
          name="size"
          placeholder="size"
        />
        <input
          type="input"
          onChange={this.handleChange}
          value={this.state.brand}
          name="brand"
          placeholder="brand"
        />
        <input
          type="input"
          onChange={this.handleChange}
          value={this.state.timeFrame}
          name="timeFrame"
          placeholder="Time Frame"
        />
        <button onClick={this.sendEdit}> Edit Item </button>
        <button onClick={this.cancelEdit}>Cancel</button>
    </div>}
    
      </div>
    );
  }

}

export default ShowItemsForm;
