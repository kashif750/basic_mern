import './App.css';

import React from 'react';
import {Routes,Route} from 'react-router-dom';

import Navbar from './components/Navbar';
import Main from './views/Main.js';
import Login from './views/Login.js';
import AboutUs from './views/AboutUs.js';
import ContactUs from './views/ContactUs.js';
import Signup from './views/Signup';
import Logout from './views/Logout';

function App() {
  return (
    <React.Fragment>
      <Navbar/>

      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/main" element={<Main/>}/>
        <Route exact path="/about-us" element={<AboutUs/>}/>
        <Route exact="true" path="/signup" element={<Signup/>}/>
        <Route exact path="/contact-us" element={<ContactUs/>}/>
        <Route exact path="/logout" element={<Logout/>}/>
      </Routes>
    </React.Fragment>
    
  );
}

export default App;
