import React, { Component } from 'react';
import InputForm from '../components/InputForm/InputForm';
import ShowItemsForm from '../components/ShowItemsForm/ShowItemsForm';
import axios from 'axios';
import './ItemsPage.css';

class ItemPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        person: '',
        lentout: false, 
        name: '',
        color: '',
        size: '',
        brand: '',
        timeFrame: null,

    }
  }

  updateMessage = (msg) => {
    this.setState({message: msg});
  }

  inputHelper = (e) =>{
      this.setState({[e.target.name]:e.target.value});
      console.log(e.target.value);
  }

  sendData = () => {
      axios.post("http://localhost:3001/api/items/lendorborrow",this.state)
        .then((response) =>  console.log(response.data))
        .catch((err) => console.log(err));

        //Clear all the data from the input
        
    




  }


  




  render() {
    return (
      <div className='ShowItemsPage'>
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
        <input type="input" onChange={this.inputHelper} name="person" placeholder="person" />
        <input type="input" onChange={this.inputHelper} name="color" placeholder="color" />
        <input type="input" onChange={this.inputHelper} name="size" placeholder="size" />
        <input type="input" onChange={this.inputHelper} name="brand" placeholder="brand" />
        <input type="input" onChange={this.inputHelper} name="timeFrame" placeholder="Time Frame" />
        <button onClick={this.sendData}> Send Item </button>
        <ShowItemsForm {...this.props} updateMessage={this.updateMessage} />
      </div>
    );
  }
}

export default ItemPage;