import React from "react";
import "./style.scss";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import DetailsBanner from "./detailBanner/DetailsBanner";
import Cast from "./cast/Cast";
import VideosSection from "./videosSection/ViedosSection";

const Details = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );

  return (
    <div>
      <DetailsBanner crew={credits?.crew} video={data?.results[0]} />
      <Cast data={credits?.cast} loading={creditsLoading}/>
      <VideosSection data={data} loading={loading}/>
    </div>
  );
};

export default Details;
