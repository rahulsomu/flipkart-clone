import React from "react";
import "./categories.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CarouselItem from "../Carousel-item/CarouselItem";
import { Link } from "react-router-dom";

const Categories = ({ data, category, heading, title }) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1700 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1700, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  return (
    <div className="wrapper">
      {title && (
        <div className="title">
          <p>{title}</p>
          <button className="primary_btn">
            <Link to="/products">View All</Link>
          </button>
        </div>
      )}
      <div className="categories">
        {heading && (
          <div
            className="heading"
            style={{
              backgroundImage:
                'url("https://rukminim1.flixcart.com/fk-p-flap/278/278/image/1e483f8045ec13a8.jpg?q=90")',
              backgroundPosition: "0px bottom",
              backgroundRepeat: "no-repeat",
            }}
          >
            <p>{heading}</p>
            <button className="primary_btn">View All</button>
          </div>
        )}

        <div
          className="category_carousel"
          style={{ width: heading ? "calc(100% - 200px)" : "100%" }}
        >
          <Carousel swipeable={false} draggable={false} responsive={responsive}>
            {data.map((item, index) => (
              <CarouselItem data={item} key={index} />
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Categories;
