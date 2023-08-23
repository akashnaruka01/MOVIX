import React from "react";
import "./style.scss";

// importing component for various section.
import HeroBanner from "./heroBanner/HeroBanner";
import Trending from "./trending/Trending";
import Popular from "./popular/Popular";
import TopRated from "./top rated/TopRated";

const Home = () => {
  return (
    <div className="homePage">
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated/>
    </div>
  );
};

export default Home;
