import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import Products from "./pages/Products/Products";
import Details from "./pages/Details/Details";
import Cart from "./pages/Cart/Cart";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "./redux/action/appActions";

const App = () => {
  const dispatch = useDispatch();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <div className="App">
      <ToastContainer />
      <Header
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        handleClose={handleClose}
      />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route
          path="/details/:id"
          element={
            <Details
              dialogOpen={dialogOpen}
              setDialogOpen={setDialogOpen}
              handleClose={handleClose}
            />
          }
        ></Route>
        <Route path="cart" element={<Cart />}></Route>
      </Routes>
    </div>
  );
};

export default App;
