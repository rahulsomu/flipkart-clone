import React from "react";
import "./carousel.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const CarouselWrapper = ({ data, full }) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: full ? 1 : 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: full ? 1 : 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: full ? 1 : 5,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: full ? 1 : 5,
    },
  };
  return (
    <div className="carousel">
      <Carousel
        swipeable={false}
        draggable={false}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={4000}
        transitionDuration={500}
        responsive={responsive}
      >
        {data.map((item, index) => (
          <div className="banner" key={index}>
            <img src={item.url} alt="carousel-img" />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselWrapper;
