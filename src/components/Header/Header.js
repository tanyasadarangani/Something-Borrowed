import React from 'react';
import tokenService from "../../utils/tokenService";

const Header = () => {

    function signOutIn() {
        //if the user is logged in
        if(localStorage.getItem("token")){
            //this signsout the user
            localStorage.removeItem("token"); 

            //re route to the home page
            this.props.history.push("/");
        }
    }

    return(
        <header className="Nav-bar">
            <p onClick={signOutIn}>{tokenService.getUserFromToken ? "Logout" : "SignIn" }</p>
        </header>
    )
}

export default Header;