import React, { useState } from "react";

// importing various components
import ContentWrapper from "../../../Components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../Components/switchTabs/SwitchTabs";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../Components/carousel/Carousel";

const Trending = () => {
  const [endpoint, setEndpoint] = useState("day"); // day or weeks
  const { data, loading } = useFetch(`/trending/all/${endpoint}`);   // fetching data according to day/week trend.
  console.log(data);

  const onTabChange = (tab) => {
    setEndpoint(tab === "Day" ? 'day':'week');
  };

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Trending</span>
        <SwitchTabs data={["Day", "week"]} onTabChange={onTabChange} />
      </ContentWrapper>

      <Carousel data = {data?.results} loading = {loading}/>
    </div>
  );
};

export default Trending;
