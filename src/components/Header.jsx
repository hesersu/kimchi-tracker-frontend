import React from "react";
import "../components/Header.css";
import logo from "../assets/designer.png";
// import allRecipeIcon from "../assets/all-recipe-icon.svg";
// import addBatchIcon from "../assets/add-batch-icon.svg";
// import profileIcon from "../assets/profile-icon.svg";

import { NavLink } from "react-router";
import { DarkModeToggle } from "./DarkModeToggle";

const Header = () => {
  return (
    <header className="header-container">
      <div className="logo-container">
      <NavLink to="/">
        <img src={logo} alt="Kimchi tracker logo" className="logo" />
        <h2 className="logo-title">Kimchi tracker</h2>
      </NavLink>
        
      </div>
      <div className="menu-container">
        <DarkModeToggle isHeader={true}/>
      <nav className="nav-container">
        <NavLink to="/">
          <button className="nav-btn">
            {/* <img
              src={allRecipeIcon}
              alt="All recipes icon"
              className="nav-icon"
            /> */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor"><path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/></svg>
            All recipes
          </button>
        </NavLink>
        <NavLink to="/select-recipe">
          <button className="nav-btn nav-btn-accent">
            {/* <img src={addBatchIcon} alt="Add batch icon" className="nav-icon" /> */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>
            Add batch
          </button>
        </NavLink>
        <NavLink to="/">
          <button className="nav-btn">
            {/* <img src={profileIcon} alt="Profile icon" className="nav-icon" /> */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/></svg>
            Profile
          </button>
        </NavLink>
      </nav>
      </div>
      
    </header>
  );
};

export default Header;
