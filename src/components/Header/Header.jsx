import React from "react";
import "./header.css";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import logo from "../../assets/logo.png";

const Header = () => {
  return (
    <div className="header">
      <div className="header_wrapper">
        <div className="logo_search">
          <div className="logo">
            <img src={logo} alt="logo" style={{ height: "30px" }} />
          </div>
          <div className="search">
            <input
              type="text"
              placeholder="Search for products,brands and more"
            />
            <SearchIcon />
          </div>
        </div>

        <div className="header_links">
          <ul>
            <li>
              <button className="header_btn">
                Login
                <KeyboardArrowDownIcon style={{ fontSize: "14px" }} />
              </button>
            </li>
            <li>
              <button className="header_btn">Become a Seller</button>
            </li>
            <li>
              <button className="header_btn">
                More
                <KeyboardArrowDownIcon style={{ fontSize: "14px" }} />
              </button>
            </li>
            <li>
              <button
                className="header_btn_cart"
                style={{ position: "relative", gap: "10px" }}
              >
                <div className="cart_count">1</div>
                <ShoppingCartIcon />
                <p>Cart</p>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
