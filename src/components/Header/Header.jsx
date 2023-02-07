import React, { useState } from "react";
import "./header.css";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import logo from "../../assets/logo.png";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import LoginForm from "../LoginForm/LoginForm";
import { useSelector } from "react-redux";
import { Button, Drawer } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";

const Header = ({ dialogOpen, setDialogOpen, handleClose }) => {
  const userDetails = useSelector((state) => state.userDetails);
  const [menuOpen, setMenuOpen] = useState(false);
  const cart = useSelector((state) => state.cart).cart;
  const cartCount = cart.reduce((initialValue, currentElement) => {
    initialValue += currentElement.quantity;
    return initialValue;
  }, 0);
  return (
    <div className="header">
      <div className="header_wrapper">
        <button className="ham_menu" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
        <Drawer
          anchor="left"
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
        >
          <div className="nav_menu">
            <ul style={{ width: "400px", padding: "5.8rem 1rem 1rem 1rem" }}>
              <li>
                {userDetails.data ? (
                  <p
                    style={{
                      color: "var(--primary)",
                      textTransform: "capitalize",
                    }}
                  >
                    {`Welcome
                    ${userDetails.data.userDetails[0].firstName}`}
                  </p>
                ) : (
                  <div
                    style={{
                      display: "flex",

                      width: "100%",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    onClick={() => {
                      setDialogOpen(true);
                    }}
                  >
                    {" "}
                    <p>Login</p>
                    <ArrowForwardIosIcon />
                  </div>
                )}
              </li>
              <li>
                <p>Become a Seller </p> <ArrowForwardIosIcon />
              </li>
              <li>
                <p>My Wishlist</p> <ArrowForwardIosIcon />
              </li>
            </ul>
          </div>
        </Drawer>
        <div className="logo_search">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="logo" style={{ height: "30px" }} />
            </Link>
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
              {!userDetails.data ? (
                <button
                  className="header_btn"
                  style={{
                    background: "white",
                    color: "var(--primary)",
                    padding: "0px 20px",
                    borderRadius: "2px",
                    textTransform: "capitalize",
                  }}
                  onClick={() => {
                    setDialogOpen(true);
                  }}
                >
                  Login
                </button>
              ) : (
                <button
                  className="header_btn dropdown_btn"
                  style={{
                    background: "var(--primary)",
                    color: "white",
                    padding: "0px 20px",
                    borderRadius: "2px",
                    textTransform: "capitalize",
                  }}
                >
                  {userDetails.data.userDetails[0].firstName}
                  <KeyboardArrowDownIcon
                    className="arrowIcon"
                    style={{ fontSize: "14px" }}
                  />
                  <div className="dropdown">
                    <ul>
                      <li>
                        <FavoriteIcon />
                        My Wishlist
                      </li>
                      <li>
                        <PowerSettingsNewIcon />
                        Logout
                      </li>
                    </ul>
                  </div>
                </button>
              )}
              <Dialog onClose={handleClose} open={dialogOpen}>
                <LoginForm setDialogOpen={setDialogOpen} />
              </Dialog>
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
              <Link to="/cart">
                <button
                  className="header_btn_cart"
                  style={{ position: "relative", gap: "10px" }}
                >
                  {cartCount > 0 && (
                    <div className="cart_count">{cartCount}</div>
                  )}
                  <ShoppingCartIcon />
                  <p>Cart</p>
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
