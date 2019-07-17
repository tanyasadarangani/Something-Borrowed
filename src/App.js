// mongo - run the mongo shell
// show dbs - shows list of all databases
// use somethingborrowed - switch to a particular database
// show collections - shows collections in the mongo db
// show users - show all mongo db users (NOT website users)
// db.users.find() - show website users (NOT mongo users)

// function signup(user) is userService.js - need item equivalent?
// currently: user types into InputPage, updates InputForm
// state is taking current values, button enabled
// save function for button click saving

// possible issues: items.js lendorborrow returning {"ok": "ok"}
// no token...?
// item.save (save function in )

// TO DO:
// everywhere that references Item in the new pages is now ShowItems
// and/or references to Input are Items or ShowItems (not consistent, so be careful)
// Find a way to show a list of items on the items form page
// need to find a way to use the user_id to get all matching items from database into (model?)
// main page should show item or list of items when complete


import React, { Component } from 'react';
import './App.css';
import {Link, Switch, Route} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import InputPage from './pages/InputPage';
import ItemsPage from './pages/ItemsPage';
import userService from './utils/userService';
import Header from "../src/components/Header/Header";
import showItemsService from './utils/showItemsService';



class App extends Component {
  state = { }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  }

  handleSignupOrLogin = () => {
    this.setState({user: userService.getUser()});
    console.log(this.state.user);
  }

  
 
  render() { 
    return (
      <div className="App">
        <header className="App-header">
          <Header/>
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
            <Route exact path='/input' render={({history}) =>
            <InputPage
            history={history}
            handleLendOrBorrow={this.handleLendOrBorrow}
            />
            } />
            <Route exact path='/' render={({history}) =>
            <ItemsPage
            history={history}
            handleShowItems={this.handleShowItems}
            handleLendOrBorrow={this.handleLendOrBorrow}
            user={this.state.user}
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
