import React, { useState } from "react";

// importing various components
import ContentWrapper from "../../../contentWrapper/ContentWrapper";
import SwitchTabs from "../../../Components/switchTabs/SwitchTabs";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../Components/carousel/Carousel";

const Popular = () => {
  const [endpoint, setEndpoint] = useState("movie"); // day or weeks
  const { data, loading } = useFetch(`/${endpoint}/top_rated`); // fetching data according to day/week trend.
  console.log(data);

  const onTabChange = (tab) => {
    setEndpoint(tab === "Movies" ? "movie" : "tv");
  };

  return (
    <div className="carouselSection"> 
      <ContentWrapper>
        <span className="carouselTitle">Top Rated</span>
        <SwitchTabs data={["Movies", "Tv Shows"]} onTabChange={onTabChange} />
      </ContentWrapper>

      <Carousel data={data?.results} loading={loading} endpoint={endpoint}/>
    </div>
  );
};

export default Popular;
