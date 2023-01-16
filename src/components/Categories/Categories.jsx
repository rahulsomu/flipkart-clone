import React from "react";
import "./categories.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CarouselItem from "../Carousel-item/CarouselItem";

const Categories = ({ data, category, heading }) => {
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
    <div className="categories">
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
        <button>View All</button>
      </div>
      <div className="category_carousel">
        <Carousel swipeable={false} draggable={false} responsive={responsive}>
          {data.map((item, index) => (
            <CarouselItem data={item} />
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Categories;
