import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';
import userService from '../utils/userService';
import axios from 'axios';

class LoginPage extends Component {
  
  state = {
    email: '',
    pw: ''
  };

  handleChange = (e) => {
    this.setState({
      // Using ES2015 Computed Property Names
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/api/users/login",this.state)
      .then(res => {
        console.log(res.data.token);
        //saving the token in a session storage
        sessionStorage.setItem("token",res.data.token)
        //once the key is saved move on the the next page
        this.props.history.push('/');
      })
      .catch(err => console.log(err))

    // try {
    //   await userService.login(this.state);
    //   // Let <App> know a user has signed up!
    //   this.props.handleSignupOrLogin();
    //   //save the token here

    //   // Successfully signed up - show GamePage
    // 
    // } catch (err) {
    //   // Use a modal or toast in your apps instead of alert
    //   alert('Invalid Credentials!');
    // }
  }

  render() {
    return (
      <div className="LoginPage">
        <header className="header-footer">Log In</header>
        <form className="form-horizontal" onSubmit={this.handleSubmit} >
          <div className="form-group">
            <div className="col-sm-12">
              <input type="email" className="form-control" placeholder="Email" value={this.state.email} name="email" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input type="password" className="form-control" placeholder="Password" value={this.state.pw} name="pw" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12 text-center">
              <button className="btn btn-default">Log In</button>&nbsp;&nbsp;&nbsp;
              <Link to='/'>Cancel</Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginPage;