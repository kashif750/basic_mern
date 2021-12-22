import React from 'react';
import {NavLink} from 'react-router-dom';

const Navbar=()=>{

    return(
        <React.Fragment>
        <NavLink exact to="/main">Main</NavLink>
        <NavLink exact to="/about-us">About Us</NavLink>
        <NavLink exact to="/contact-us">Contact Us</NavLink>
        <NavLink exact to="/signup">SignUp</NavLink>
        </React.Fragment>
    )
}

export default Navbar;
