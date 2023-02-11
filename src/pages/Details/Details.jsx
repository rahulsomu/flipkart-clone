import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProductDetails } from "../../redux/action/getProductDetailsAction";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import StarIcon from "@mui/icons-material/Star";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import "./details.css";
import { addItemToCart } from "../../redux/action/addItemToCartAction";
import {
  addItem,
  increaseQuantity,
  wishlistItems,
} from "../../redux/action/appActions";
import { toast } from "react-toastify";
import { formatPrice } from "../../Utils/functions";
import { CircularProgress, Dialog } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Details = ({ dialogOpen, setDialogOpen, handleClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const userDetails = useSelector((state) => state.userDetails);
  const cart = useSelector((state) => state.cart).cart;
  const loggedIn = useSelector((state) => state.loggedIn).status;
  const user = userDetails.data && userDetails?.data?.userDetails[0];
  const productDetails = useSelector((state) => state.productDetails);
  const { data, success, error } = productDetails;
  const prodData = success && data?.data[0];
  const wishlist = useSelector((state) => state.wishlist).wishlist;

  const [image, setImage] = useState("");
  const [variantSelected, setVariantSelected] = useState(null);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);

  const fAssured =
    "https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png";
  const calculateDiscount = (cp, sp) => {
    return Math.abs(Math.ceil(((sp - cp) / cp) * 100));
  };
  const rupeeSymbol = "₹";
  const addTocart = () => {
    if (loggedIn) {
      if (variantSelected || prodData?.variant === null) {
        const payload = {
          ...prodData,
          variant: variantSelected,
          userId: user._id,
          quantity: 1,
        };
        // dispatch(addItemToCart(payload));

        if (
          cart.filter(
            (item) =>
              item._id === prodData._id && item.variant === variantSelected
          ).length > 0
        ) {
          if (
            cart.filter(
              (item) =>
                item._id === prodData._id && item.variant === variantSelected
            ).length > 0 &&
            cart.filter(
              (item) =>
                item._id === prodData._id && item.variant === variantSelected
            )[0].quantity < 5
          )
            dispatch(increaseQuantity(payload));
        } else {
          dispatch(addItem(payload));
        }

        navigate("/cart");
      } else {
        toast.error(`Please select ${prodData?.variant?.type}`, {
          position: "bottom-center",

          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } else {
      setDialogOpen(true);
      toast.error("Please Login First", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  const handleImageDialog = () => {
    setImageDialogOpen(false);
  };
  const wishlistHandler = () => {
    dispatch(wishlistItems(prodData));
    console.log(wishlist);
  };
  useEffect(() => {
    dispatch(getProductDetails(id));
    if (image) {
      setImage(prodData?.mainImage);
    }
  }, []);
  return (
    <div className="details_wrapper">
      {success ? (
        <>
          <div className="image_section">
            <div className="images_wrapper">
              <div className="small_images">
                {prodData?.allImages?.map((data, index) => (
                  <img key={index} src={data} onClick={() => setImage(data)} />
                ))}
              </div>
              <div className="main_image">
                <button
                  className="wishlist_icon_details"
                  onClick={wishlistHandler}
                >
                  <FavoriteIcon
                    style={{
                      color: wishlist.includes(prodData) ? "red" : "#87878793",
                    }}
                  />
                </button>
                <img
                  src={image ? image : prodData?.mainImage}
                  onClick={() => setImageDialogOpen(true)}
                />
                <Dialog open={imageDialogOpen} onClose={handleImageDialog}>
                  <div className="image_dialog">
                    <img
                      src={image ? image : prodData?.mainImage}
                      alt="product-img"
                    />
                  </div>
                </Dialog>
              </div>
            </div>
            <div className="buttons">
              <button
                style={{ background: "#ff9f00" }}
                className="addToCart"
                onClick={addTocart}
              >
                <ShoppingCartIcon />
                {cart.filter(
                  (item) =>
                    item._id == prodData._id && item.variant === variantSelected
                ).length > 0
                  ? "GO TO CART"
                  : "ADD TO CART"}
              </button>
              <button style={{ background: "#fb641b" }} className="buyNow">
                <FlashOnIcon />
                BUY NOW
              </button>
            </div>
          </div>
          <div className="details_section">
            <p>Home</p>
            <p className="product_brandName">{prodData?.brand}</p>
            <p className="product_name">{prodData?.productName}</p>
            <div className="product_rating">
              <div className="ratingIcon">
                <p>{prodData?.rating?.overallRating}</p>
                <StarIcon />
              </div>
              <p>{`${formatPrice(
                prodData?.rating?.ratings
              )} Ratings & ${formatPrice(
                prodData?.rating?.reviews
              )} Reviews`}</p>
              <div className="fAssured">
                <img src={fAssured} alt="" />
              </div>
            </div>
            <div className="productPrice">
              <div className="productSellingPrice">{`${rupeeSymbol}${formatPrice(
                prodData?.sellingPrice
              )}`}</div>
              <div className="productMrp">{`${rupeeSymbol}${formatPrice(
                prodData?.mrp
              )}`}</div>
              <div className="productDiscount">
                {`${calculateDiscount(
                  prodData?.mrp,
                  prodData?.sellingPrice
                )}% off`}
              </div>
            </div>
            <div className="availableOffers">
              <p>Available offers</p>
              <div className="offerItem">
                <LocalOfferIcon />
                <p>Flipkart Pay Later</p>
              </div>
              <div className="offerItem">
                <LocalOfferIcon />
                <p>
                  10% off on Kotak Bank Credit Cards and Credit EMI Trxns, up to
                  ₹1,000. On orders of ₹5,000 and above
                </p>
              </div>
              <div className="offerItem">
                <LocalOfferIcon />
                <p>
                  10% off on Yes Bank Credit Card and EMI Transactions, up to
                  ₹1,500. On orders of ₹10,000 and above
                </p>
              </div>
              <div className="offerItem">
                <LocalOfferIcon />
                <p>Extra 1% Off on UPI transactions</p>
              </div>
            </div>
            <div className="availableVariants">
              <p>{prodData?.variant?.type}</p>
              <div className="variants">
                {prodData?.variant?.values?.map((data, index) => (
                  <button
                    key={index}
                    style={{
                      border:
                        variantSelected == data
                          ? "1px solid var(--primary)"
                          : "1px solid rgba(128, 128, 128, 0.161)",
                    }}
                    onClick={() => setVariantSelected(data)}
                  >
                    {data}
                  </button>
                ))}
              </div>
            </div>
            <div className="allHighlights">
              <p>Highlights</p>
              <div className="highlight">
                <ul>
                  {prodData?.highlights?.map((data, index) => (
                    <li key={index}>
                      <p>{data}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="sellerInfo">
              <p>Seller</p>
              <div>
                <div className="sellerRating">
                  <p>OnlineServices</p>
                  <div
                    style={{
                      background: "var(--primary",
                      display: "flex",
                      padding: "2px 5px",
                      borderRadius: "20px",
                      alignItems: "center",
                    }}
                  >
                    <p style={{ color: "white" }}>4.8</p>
                    <StarIcon />
                  </div>
                </div>
                <ul style={{ listStyle: "none" }}>
                  <li>
                    <p
                      style={{
                        fontSize: "1.2rem",
                        marginBottom: "5px",
                        fontWeight: "400",
                        color: "black",
                        marginTop: "5px",
                      }}
                    >
                      7 day seller replacement policy/brand assistance for
                      device issues*
                    </p>
                    <p
                      style={{
                        fontSize: "1.2rem",
                        marginBottom: "5px",
                        fontWeight: "400",
                        color: "black",
                        marginTop: "5px",
                      }}
                    >
                      GST invoice available
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="fPlusImage">
              <img
                src="https://rukminim1.flixcart.com/lockin/400/400/images/promotion_banner_v2_active.png?q=50"
                alt="F-plus"
              />
            </div>
          </div>
        </>
      ) : (
        <div className="loader_wrapper">
          <CircularProgress />
          <p>Loading! Please wait..</p>
        </div>
      )}
    </div>
  );
};

export default Details;
