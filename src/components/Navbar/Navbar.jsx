import React from "react";
import "./navbar.css";
import { navbarData } from "../../Utils/data";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar_wrapper">
        {navbarData.map((item, index) => {
          return (
            <Link to="/products" key={index}>
              {" "}
              <div className="navbar_item">
                <img src={item.url} alt="navigation-img" />
                <p>{item.text}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
