import "../styles/Header.css"
import React from 'react';
import { IoMdSearch } from "react-icons/io";
const Header = () => {
  return (
    <div className="Header">
      <div className="Left">
        <h3 style={{marginTop:10}}>Weather Dashboard</h3>
      </div>
      <div className="Center">
        <div className="SearchBox">
        <IoMdSearch size={24} style={{color:'black',marginLeft:10}} />
          <input type="text" placeholder="Search" />
          <i className="fa fa-search"></i>
        </div>
      </div>
      <div className="Right">
        <button>Gobichettipalayam</button>
      </div>
    </div>
  );
}

export default Header;
