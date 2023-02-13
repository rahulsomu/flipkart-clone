import React, { useEffect, useState } from "react";
import "./product.css";
import Carousel from "react-multi-carousel";
import { formatPrice } from "../../Utils/functions";
import "react-multi-carousel/lib/styles.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { wishlistItems } from "../../redux/action/appActions";
import { Link } from "react-router-dom";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/action/wishlistAction";
import { toast } from "react-toastify";

const Product = ({ productDetails, wishlisted }) => {
  const dispatch = useDispatch();
  const productImages = [...productDetails?.allImages];
  const user = useSelector((state) => state.userDetails);
  const userId = user.data && user.data?.userDetails[0]?._id;
  const wishlist = useSelector((state) => state.wishlist).wishlist;

  const userDetails = user.data && user?.data?.userDetails[0];

  let num = 0;
  const [imgIndex, setImgIndex] = useState(num);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const rupeeSymbol = "₹";
  const calculateDiscount = (cp, sp) => {
    return Math.abs(Math.ceil(((sp - cp) / cp) * 100));
  };
  const fAssured =
    "https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png";
  const wishlistHandler = () => {
    userDetails.wishlist.filter((item) => item._id === productDetails._id)
      .length > 0
      ? dispatch(removeFromWishlist({ ...productDetails, userId }))
      : dispatch(addToWishlist({ ...productDetails, userId }));
  };

  return (
    <div className="product">
      {userDetails && (
        <button className="wishlist_icon" onClick={wishlistHandler}>
          <FavoriteIcon
            style={{
              color:
                userDetails.wishlist?.filter(
                  (item) => item._id == productDetails._id
                ).length > 0
                  ? "red"
                  : "#87878793",
            }}
          />
        </button>
      )}
      <Link to={`/details/${productDetails._id}`} key={productDetails._id}>
        <>
          {" "}
          <div className="product_img">
            <img
              src={
                productImages ? productImages[num] : productDetails?.mainImage
              }
              alt="prod-image"
            />
            {/* )} */}
          </div>
          <div className="product_info">
            <div className="product_brand">
              <p>{productDetails.brand}</p>
            </div>
            <div className="product_name">
              <p>{productDetails.productName}</p>
              <div className="fAssured">
                <img src={fAssured} alt="fassured" />
              </div>
            </div>
            <div className="product_price">
              <p className="selling_price">{`${rupeeSymbol}${formatPrice(
                productDetails.sellingPrice
              )}`}</p>
              <p className="mrp">{`${rupeeSymbol}${formatPrice(
                productDetails.mrp
              )}`}</p>
              <p className="discount">
                {`${calculateDiscount(
                  productDetails.mrp,
                  productDetails.sellingPrice
                )}% off`}
              </p>
            </div>

            <div className="product_sizes">
              {productDetails.variant && (
                <>
                  <p>{productDetails.variant?.type}: </p>
                  {productDetails.variant?.values?.map((values, i) => (
                    <p key={i}>
                      {values.toUpperCase()}
                      {i !== productDetails.variant?.values?.length - 1 && ","}
                    </p>
                  ))}
                </>
              )}
            </div>
          </div>
        </>
      </Link>
    </div>
  );
};

export default Product;
