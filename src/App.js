import React, { Component } from 'react';
import './App.css';
import {Link, Switch, Route} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import userService from './utils/userService';



class App extends Component {
  state = {  }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  }

  handleSignupOrLogin = () => {
    this.setState({user: userService.getUser()});
  }


  render() { 
    return (
      <div className="App">
        <header className="App-header">
          <h1>Something Borrowed</h1>
          <Switch>
            <Route exact path='/signup' render={({history}) =>
            <SignupPage
            history={history}
            handleSignupOrLogin={this.handleSignupOrLogin}
            />
            } />
            <Route exact path='/login' render={({history}) =>
            <LoginPage
            history={history}
            handleSignupOrLogin={this.handleSignupOrLogin}
            />
            } />
          </Switch>
          <button onClick={this.handleLogout}>LogOut</button>
        </header>
      </div>
    );
  }
}
 
export default App;
