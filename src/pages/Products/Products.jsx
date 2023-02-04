import React from "react";
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

const Products = () => {
  const dispatch = useDispatch();
  const { loading, success } = useSelector((state) => state.allProducts);
  const products = useSelector((state) => state.allProducts).data.data;
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);
  return (
    <div className="product_wrapper">
      {loading ? (
        <div className="loader_wrapper">
          <CircularProgress />
          <p>Loading! Please wait..</p>
        </div>
      ) : success ? (
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
                Home <span>(Showing 1 – 40 products of 14,511 products)</span>
              </p>
            </div>
            <div className="sorting">
              <p>Sort By</p>
              <button>Popularity</button>
              <button>Price - Low to High</button>
              <button>Price - High to Low</button>
              <button>Newest First</button>
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
                <Link to={`/details/${data._id}`} key={data._id}>
                  <Product productDetails={data} />
                </Link>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="error_wrapper">
          <p style={{ fontSize: "2rem" }}>Error reaching our servers :(</p>
          <button
            className="primary_btn"
            onClick={() => dispatch(getAllProducts())}
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
