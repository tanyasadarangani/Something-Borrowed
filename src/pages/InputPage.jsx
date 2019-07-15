import React, { Component } from 'react';
import InputForm from '../components/InputForm/InputForm';
import './InputPage.css';

class InputPage extends Component {
  constructor(props) {
    super(props);
    this.state = {message: ''}
  }

  updateMessage = (msg) => {
    this.setState({message: msg});
  }

  render() {
    return (
      <div className='InputPage'>
        <InputForm {...this.props} updateMessage={this.updateMessage} />
        <p>{this.state.message}</p>
      </div>
    );
  }
}

export default InputPage;