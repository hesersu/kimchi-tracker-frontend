import React from "react";
import "../components/Header.css";
import { NavLink } from "react-router";

const Header = () => {
  return (
    <header className="header-container">
      <div>Logo Image</div>
      <nav>
        <NavLink to="/">
          <button>View All Recipes</button>
        </NavLink>
        <NavLink to="/select-recipe">
          <button>Add New Batch </button>
        </NavLink>
        <button>Profile</button>
      </nav>
    </header>
  );
};

export default Header;
