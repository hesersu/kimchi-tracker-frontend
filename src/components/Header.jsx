import React from "react";
import "../components/Header.css";
import logo from "../assets/designer.png";
import allRecipeIcon from "../assets/all-recipe-icon.svg";
import addBatchIcon from "../assets/add-batch-icon.svg";
import profileIcon from "../assets/profile-icon.svg";

import { NavLink } from "react-router";

const Header = () => {
  return (
    <header className="header-container">
      <div className="logo-container">
        <img src={logo} alt="Kimchi tracker logo" className="logo" />
        <h2 className="logo-title">Kimchi tracker</h2>
      </div>
      <nav className="nav-container">
        <NavLink to="/">
          <button className="nav-btn">
            <img
              src={allRecipeIcon}
              alt="All recipes icon"
              className="nav-icon"
            />
            All recipes
          </button>
        </NavLink>
        <NavLink to="/select-recipe">
          <button className="nav-btn nav-btn-accent">
            <img src={addBatchIcon} alt="Add batch icon" className="nav-icon" />
            Add batch
          </button>
        </NavLink>
        <NavLink to="/">
          <button className="nav-btn">
            <img src={profileIcon} alt="Profile icon" className="nav-icon" />
            Profile
          </button>
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
