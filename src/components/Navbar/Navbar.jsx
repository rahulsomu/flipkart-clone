import React from "react";
import "./navbar.css";
import { navbarData } from "../../Utils/data";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar_wrapper">
        {navbarData.map((item) => {
          return (
            <div className="navbar_item">
              <img src={item.url} alt="navigation-img" />
              <p>{item.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
