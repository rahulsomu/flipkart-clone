import React, { useState } from "react";
import { Link } from "react-router-dom";
import Product from "../../components/Product/Product";
import "./products.css";
// import { products } from "../../Utils/data";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { InputLabel, MenuItem, styled } from "@mui/material";
import { useEffect } from "react";
import { getAllProducts } from "../../redux/action/getAllProductsAction";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import { wishlistItems } from "../../redux/action/appActions";
import {
  clearAddToWishlistStatus,
  clearRemoveFromWishlistStatus,
} from "../../redux/action/wishlistAction";
import { getUserDetails } from "../../redux/action/getUserDetailsAction";

const Products = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.allProducts);
  const products = useSelector((state) => state.allProducts).data.data;
  const wishlist = useSelector((state) => state.wishlist).wishlist;
  const addToWishlistStatus = useSelector((state) => state.addToWishlist);
  const removeFromWishlistStatus = useSelector(
    (state) => state.removeFromWishlist
  );
  const user = useSelector((state) => state.userDetails);
  const userDetails = user.data?.userDetails && user.data?.userDetails[0]._id;
  const [age, setAge] = useState("");
  const sort = localStorage.getItem("sortType") || "1";
  const [sortType, setSortType] = useState(sort);
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  useEffect(() => {
    if (addToWishlistStatus.success) {
      toast.success(`Added to Wishlist`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      dispatch(getUserDetails({ userId: userDetails }));
      dispatch(clearAddToWishlistStatus());
    }
  }, [addToWishlistStatus.success]);
  useEffect(() => {
    if (removeFromWishlistStatus.success) {
      toast.success(`Removed From Wishlist`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      dispatch(getUserDetails({ userId: userDetails }));
      dispatch(clearRemoveFromWishlistStatus());
    }
  }, [removeFromWishlistStatus.success]);

  useEffect(() => {
    localStorage.removeItem("sortType");
    setSortType(sort);
    if (sortType) dispatch(getAllProducts(sortType));
  }, []);
  return (
    <div className="product_wrapper">
      {success ? (
        <>
          <div className="filter_section">
            <div className="filter_heading">Filters</div>
          </div>
          <div className="products_section">
            <div className="top_links">
              <Link to="/">Home</Link>
            </div>
            <div className="products_heading">
              <p>
                Home{" "}
                <span>
                  (
                  {`Showing 1 – ${products?.length} products of ${products?.length} products`}
                  )
                </span>
              </p>
            </div>
            <div className="sorting">
              <p>Sort By</p>
              <button
                style={{
                  color: sortType === "1" ? "var(--primary)" : "black",
                  borderBottom:
                    sortType === "1" ? "1px solid var(--primary)" : "none",
                }}
                onClick={() => {
                  setSortType("1");
                  localStorage.setItem("sortType", "1");
                  dispatch(getAllProducts(1));
                }}
              >
                Popularity
              </button>
              <button
                style={{
                  color: sortType === "2" ? "var(--primary)" : "black",
                  borderBottom:
                    sortType === "2" ? "1px solid var(--primary)" : "none",
                }}
                onClick={() => {
                  setSortType("2");
                  localStorage.setItem("sortType", "2");
                  dispatch(getAllProducts(2));
                }}
              >
                Price - Low to High
              </button>
              <button
                style={{
                  color: sortType === "3" ? "var(--primary)" : "black",
                  borderBottom:
                    sortType === "3" ? "1px solid var(--primary)" : "none",
                }}
                onClick={() => {
                  setSortType("3");
                  localStorage.setItem("sortType", "3");
                  dispatch(getAllProducts(3));
                }}
              >
                Price - High to Low
              </button>
              <button
                style={{
                  color: sortType === "4" ? "var(--primary)" : "black",
                  borderBottom:
                    sortType === "4" ? "1px solid var(--primary)" : "none",
                }}
                onClick={() => {
                  setSortType("4");
                  localStorage.setItem("sortType", "4");
                  dispatch(getAllProducts(4));
                }}
              >
                Newest First
              </button>
            </div>
            <div className="sort_dropdown">
              <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-filled-label">
                  Sort By
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={age}
                  onChange={handleChange}
                >
                  <MenuItem value="">Newest First</MenuItem>
                  <MenuItem value={10}>Popularity</MenuItem>
                  <MenuItem value={20}>Price - Low to High</MenuItem>
                  <MenuItem value={30}>Price - High to Low</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="product_grid">
              {products?.map((data, index) => (
                <Product
                  productDetails={data}
                  key={index}
                  wishlisted={wishlist.includes(data) ? true : false}
                />
              ))}
            </div>
          </div>
        </>
      ) : error ? (
        <div className="error_wrapper">
          <p style={{ fontSize: "2rem" }}>Error reaching our servers :(</p>
          <button
            className="primary_btn"
            onClick={() => dispatch(getAllProducts(sortType))}
          >
            Try again
          </button>
        </div>
      ) : (
        <div className="loader_wrapper">
          <CircularProgress />
          <p>Loading! Please wait..</p>
        </div>
      )}
    </div>
  );
};

export default Products;
