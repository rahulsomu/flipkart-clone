import React from "react";
import "./carouselItem.css";

const CarouselItem = ({ data }) => {
  return (
    <div className="carouselItem">
      <div className="item_image">
        <img src={data.url} alt="product-img" />
      </div>
      <p className="primary_heading">{data.primaryHeading}</p>
      <p className="offer">{data.offer}</p>
      <p className="secondary_heading">{data.secondaryHeading}</p>
    </div>
  );
};

export default CarouselItem;
