import React, { Component } from "react";
import InputForm from "../components/InputForm/InputForm";
import ShowItemsForm from "../components/ShowItemsForm/ShowItemsForm";
import axios from "axios";
import "./ItemsPage.css";
import showItemsService from "../utils/showItemsService";
import tokenService from "../utils/tokenService";

class ItemPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person: "",
      lentout: false,
      name: "",
      color: "",
      size: "",
      brand: "",
      timeFrame: "",
      list: []
    };
  }
  //reference for updating state 
  async componentWillMount() {
    const itemList = await showItemsService.getItemList();
    if (itemList) {
      this.setState({ list: itemList });
    }
  }

  updateMessage = msg => {
    this.setState({ message: msg });
  };

  inputHelper = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  handleLendOrBorrow = async () => {
    const items = await showItemsService.getItemList();
    this.setState({ list: items });
  }

  sendData = (e) => {
    e.preventDefault();
    fetch('/api/items/lendorborrow', {
      method: 'POST',
      headers: new Headers ({
      "Content-Type": "application/json",
      "Authorization": "Bearer " + tokenService.getToken()
      }),
      body: JSON.stringify(this.state)
    }).then(res => {
      return res.json();
    }).catch(err => console.log(err));

    // const { name, person, color, size, brand, timeFrame } = this.state;
    
    //populates to the list
    // this.state.list.push({ name, person, color, size, brand, timeFrame });

    //Clear all the data from the input
    this.handleLendOrBorrow();
  };

  render() {
    return (
      <div className="ShowItemsPage">
        {/**Under this is where the input goes 
            user: String,
            person: String,
            lentout: Boolean, 
            name: String,
            color: String,
            size: String,
            brand: String,
            timeframe: Number,
        */}
        {this.props.user ? <div>
        <input
          type="input"
          className="input"
          onChange={this.inputHelper}
          value={this.state.name}
          name="name"
          placeholder="name"
        />
        <input
          type="input"
          className="input"
          onChange={this.inputHelper}
          value={this.state.person}
          name="person"
          placeholder="person"
        />
        <input
          type="input"
          className="input"
          onChange={this.inputHelper}
          value={this.state.color}
          name="color"
          placeholder="color"
        />
        <input
          type="input"
          className="input"
          onChange={this.inputHelper}
          value={this.state.size}
          name="size"
          placeholder="size"
        />
        <input
          type="input"
          className="input"
          onChange={this.inputHelper}
          value={this.state.brand}
          name="brand"
          placeholder="brand"
        />
        <input
          type="input"
          className="input"
          onChange={this.inputHelper}
          value={this.state.timeFrame}
          name="timeFrame"
          placeholder="Time Frame"
        />
      <button className="button" onClick={this.sendData}> Send Item </button>
      </div> : null }

        {this.state.list.map((object, key) => {
          console.log(object);
          return (
            <ShowItemsForm
              {...this.props}
              name={object.name}
              person={object.person}
              color={object.color}
              size={object.size}
              brand={object.brand}
              timeFrame={object.timeFrame}
              updateMessage={this.updateMessage}
              id={object._id}
              object={object}
              handleLendOrBorrow={this.handleLendOrBorrow}
            />
          );
        })}
      </div>
    );
  }
}

export default ItemPage;
