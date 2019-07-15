import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import userService from '../../utils/userService.js';
import itemService from '../../utils/itemService.js';

class InputForm extends Component {

  state = {
    user: userService.getUser()._id,
    person: '',
    lentout: null, 
    name: '',
    color: '',
    size: '',
    brand: '',
    timeframe: '',
  };

  handleChange = (e) => {
    console.log("UPDATED");
    this.props.updateMessage('');
    this.setState({
      // Using ES2015 Computed Property Names
      [e.target.name]: e.target.value
    }, function() {
      console.log(this.state);
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await itemService.input(this.state);
      // Let <App> know a user has signed up!
      this.props.handleLendOrBorrow();
      // Successfully signed up - show GamePage
      this.props.history.push('/');
    } catch (err) {
      // Invalid user data (probably duplicate email)
      this.props.updateMessage(err.message);
    }
  }

  isFormInvalid() {
    return !(this.state.user && this.state.person && this.state.lentout!=null && this.state.name && this.state.color && this.state.brand &&
      this.state.size && this.state.timeframe);
  }

  render() {
    return (
      <div>
        <header className="header-footer">Lend or Borrow</header>
        <form className="form-horizontal" onSubmit={this.handleSubmit} >
          <div className="form-group">
            <div className="col-sm-12">
              <input type="text" className="form-control" placeholder="User" value={userService.getUser()._id} name="user" readOnly disabled />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input type="text" className="form-control" placeholder="Person" value={this.state.person} name="person" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              Borrow: <input type="radio" className="form-control" value="false" name="lentout" onChange={this.handleChange} />
              &nbsp;&nbsp;
              Loan: <input type="radio" className="form-control" value="true" name="lentout" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input type="text" className="form-control" placeholder="Ball" value={this.state.name} name="name" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input type="text" className="form-control" placeholder="Red" value={this.state.color} name="color" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input type="text" className="form-control" placeholder="big" value={this.state.size} name="size" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input type="text" className="form-control" placeholder="LV" value={this.state.brand} name="brand" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input type="text" className="form-control" placeholder="3" value={this.state.timeframe} name="timeframe" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12 text-center">
              <button className="btn btn-default" disabled={this.isFormInvalid()}>true/false</button>&nbsp;&nbsp;
              <Link to='/'>Cancel</Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default InputForm;