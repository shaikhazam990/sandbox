import React from "react";
import "./nav.scss";
import DateTime from "./DateTime";

const Nav = () => {
  return (
    <nav>
      <div className="left">
        <div>
          <img src="./navbar-icons/apple.svg" alt="" />
        </div>
        <div className="nav-itms">
            <p>Azam Shaikh</p>
        </div>
        <div className="nav-itms">
            <p>File</p>
        </div>
        <div className="nav-itms">
            <p>Edit</p>            
        </div>
        <div className="nav-itms">
            <p>Profile</p>            
        </div>
        <div className="nav-itms">
            <p>Tab</p>            
        </div>                         
        <div className="nav-itms">
            <p>Window</p>
        </div>
        <div className="nav-itms">
            <p>Terminal</p>            
        </div>
        <div className="nav-itms">
            <p>Help</p>            
        </div>                               
      </div>
      <div className="right">
        <div className="nav-icon">
            <img src="./navbar-icons/wifi.svg" alt="" />
        </div>
        <div className="nav-icon">
            <img src="./navbar-icons/search-line.svg" alt="" />
        </div>        
        <div className="nav-item">
            <DateTime/>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
