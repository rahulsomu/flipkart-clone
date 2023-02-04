import React from "react";
import Carousel from "../../components/Carousel/Carousel";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import "./home.css";
import { mainBanner } from "../../Utils/data";
import Ad from "../../assets/ad.png";
import Ads from "../../components/Ads/Ads";
import Categories from "../../components/Categories/Categories";
import { offers } from "../../Utils/data";
const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <Carousel data={mainBanner} full={true} />
      <Ads img={Ad} />
      <Categories
        data={offers}
        heading="Best Of Electronics"
        category="electronics"
      />
      <Categories
        title="Top Selling Products"
        data={offers}
        category="electronics"
      />
    </div>
  );
};

export default Home;
