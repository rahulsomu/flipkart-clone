import React, { useState } from "react";
import "./product.css";
import Carousel from "react-multi-carousel";
import { formatPrice } from "../../Utils/functions";
import "react-multi-carousel/lib/styles.css";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Product = ({ productDetails }) => {
  const productImages = [...productDetails?.allImages];
  const [imgCarousel, setImgCarousel] = useState(false);
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
  let id;
  // const startAnimation = () => {
  //   id = setInterval(() => {
  //     setImgIndex(num + 1);
  //     console.log("mouseEnter");
  //   }, 2000);
  // };
  // const stopAnimation = () => {
  //   clearInterval(id);
  //   console.log("mouseLeave");
  // };
  return (
    <div className="product">
      <div className="wishlist_icon">
        <FavoriteIcon />
      </div>
      <div
        className="product_img"
        // onMouseOver={startAnimation}
        // onMouseOut={stopAnimation}
      >
        {/* {!imgCarousel ? (
          <Carousel
            swipeable={false}
            draggable={false}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={4000}
            transitionDuration={500}
            responsive={responsive}
            removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
          >
            {productDetails?.allImages.map((image) => (
              <img src={image} alt="prod-image" />
            ))}
          </Carousel>
        ) : ( */}
        <img
          src={productImages ? productImages[num] : productDetails?.mainImage}
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
    </div>
  );
};

export default Product;
