import React, { Component } from 'react';
import InputForm from '../components/InputForm/InputForm';
import ShowItemsForm from '../components/ShowItemsForm/ShowItemsForm';
import axios from 'axios';
import './ItemsPage.css';
import showItemsService from '../utils/showItemsService';

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
        timeFrame: '',
        list:[]
    }
  }

  async componentWillMount(){
    const data = await sessionStorage.getItem("token")
    console.log(data);

    const itemList = await showItemsService.getItemList();
    this.setState({ list: itemList });
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
        const {name, person, color,size, brand, timeFrame} = this.state;
        this.state.list.push({name,person,color,size,brand,timeFrame});

        //Clear all the data from the input
        this.setState({name:" ", person:" " , color:" ", size: " ", brand:" ", timeFrame: " " })
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
        <input type="input" onChange={this.inputHelper} value ={this.state.name}name="name" placeholder="name" />
        <input type="input" onChange={this.inputHelper} value ={this.state.person}name="person" placeholder="person" />
        <input type="input" onChange={this.inputHelper} value ={this.state.color}name="color" placeholder="color" />
        <input type="input" onChange={this.inputHelper} value ={this.state.size}name="size" placeholder="size" />
        <input type="input" onChange={this.inputHelper} value ={this.state.brand}name="brand" placeholder="brand" />
        <input type="input" onChange={this.inputHelper} value ={this.state.timeFrame}name="timeFrame" placeholder="Time Frame" />
        <button onClick={this.sendData}> Send Item </button>

        {/* {itemList} */}

        {this.state.list.map((object,key) => {
          
              console.log(object)
                return <ShowItemsForm {...this.props} 
                    name={object.name}
                    person={object.person}
                    color={object.color}
                    size={object.size}
                    brand={object.brand}
                    timeFrame={object.timeFrame}
                    updateMessage={this.updateMessage} 
                />
        })}
        
      </div>
    );
  }
}

export default ItemPage;